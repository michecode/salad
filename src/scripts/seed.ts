import dotenv from 'dotenv'; // Load environment variables from .env.local
import { PrismaClient } from '@prisma/client';
import { createApi } from 'unsplash-js';
import { type ApiResponse } from 'unsplash-js/dist/helpers/response';
import { type Basic as BasicPhoto } from 'unsplash-js/dist/methods/photos/types';

dotenv.config({ path: '.env.local' });

const UNSPLASH_MUSEUMS = [
  'tepapa', // Museum of New Zealand Te Papa Tongarewa
  'artchicago', // Art Institute of Chicago
  'bostonpubliclibrary', // Boston Public Library
  'libraryofcongress', // Library of Congress
  'birminghammuseumstrust', // Birmingham Museums Trust
  'europeana', // Europeana
  'nasa', // NASA
];

// @DEV: I only have 50 requests per hour because of unsplash limitations
const PAGES_PER_MUSEUM = 1;

const prisma = new PrismaClient();
const unsplash = createApi({ accessKey: process.env.UNSPLASH_ACCESS_KEY });

async function seed() {
  // ~~~~~~~~~~~~
  // Unsplash fetch
  // ~~~~~~~~~~~~
  const responsePromises: Promise<ApiResponse<{ results: BasicPhoto[], total: number }>>[] = [];
  UNSPLASH_MUSEUMS.forEach((museum) => {
    // For page requests. Also need to minimize requests before I only have 50/hr !
    for (let index = 0; index < PAGES_PER_MUSEUM; index++) {
      const unsplashRequest = unsplash.users.getPhotos({
        username: museum,
        page: index + 1,
        perPage: 30, // Max
        // @ts-expect-error valid value according to docs.
        orderBy: 'popular',
      });
      
      console.log(`fetching from ${museum} with page: ${index+1}`);
      responsePromises.push(unsplashRequest);
    }
  });

  let images: BasicPhoto[] = [];
  await Promise.all(responsePromises).then((museumResponses) => {
    museumResponses.forEach((museum) => {
      if (!museum) { return console.log('error seeding. museum undefined'); }
      if (!museum.response) { return console.log('error seeding. response failed'); }

      images = images.concat(museum.response.results);
    });
  }).catch((e) => console.error(e));
  console.log('Fetched all images', `Total Images: ${images.length}`);
  // End Fetch

  console.log('starting data insert');
  const products = await prisma.$transaction(async (txn) => {
    await txn.product.deleteMany();

    const formattedImages = images.map((unsplashImage) => {
      return {
        description: unsplashImage.description,
        altDescription: unsplashImage.alt_description,
        museum: unsplashImage.user.name,
        museumBio: unsplashImage.user.bio,
        museumLocation: unsplashImage.user.location,
        museumProfilePicture: unsplashImage.user.profile_image.large,
        museumProfilePictureThumbnail: unsplashImage.user.profile_image.small,
        price: Math.floor(Math.random() * 300),
        rawImageUrl: unsplashImage.urls.raw,
        fullImageUrl: unsplashImage.urls.full,
        imageUrl: unsplashImage.urls.regular,
        smallImageUrl: unsplashImage.urls.small,
        thumbnailUrl: unsplashImage.urls.thumb,
        blurHash: unsplashImage.blur_hash,
      };
    });

    return await txn.product.createManyAndReturn({
      data: formattedImages,
    });
  });
  console.log('Completed database seeding successfully');
}

seed().finally(async () => {
	await prisma.$disconnect();
});
