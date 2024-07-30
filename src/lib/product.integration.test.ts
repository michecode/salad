import { beforeAll, describe, expect, it, vi } from 'vitest';
import { seed } from '../scripts/seed';
import { Product } from '@prisma/client';

describe('product prisma', () => {
  let getAllProducts: (page: number, museum: string | undefined) => Promise<any>;
  let getProduct: ({ productId }: { productId: string }) => Promise<any>;
  let createProduct: (product: Product) => Promise<any>;

  const sampleProduct: Product = {
    id: 'test-id',
    description: 'Test product',
    altDescription: null,
    museum: 'Test museum',
    museumId: 'test-museum',
    museumBio: null,
    museumLocation: null,
    museumProfilePicture: 'test-pic.jpg',
    museumProfilePictureThumbnail: 'test-thumb.jpg',
    price: 1000,
    rawImageUrl: 'test-raw.jpg',
    fullImageUrl: 'test-full.jpg',
    imageUrl: 'test-img.jpg',
    smallImageUrl: 'test-small.jpg',
    thumbnailUrl: 'test-thumb.jpg',
    blurHash: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeAll(async () => {
    vi.doUnmock('~/server/db');

    // Seed the database
    await seed();

    // Dynamically import getAllProducts after unmocking
    const productModule = await import('./product');
    getAllProducts = productModule.getAllProducts;
    getProduct = productModule.getProduct;
    createProduct = productModule.createProduct;
  });

  it('should get a list of products', async () => {
    const products = await getAllProducts(1, undefined);
    console.log(products);
    expect(products.length).toBeGreaterThan(1);
  });

  it('should fail to get a product', async () => {
    const product = await getProduct({ productId: '' });
    expect(product).toBeNull();
  });

  it('should get a product', async () => {
    await createProduct(sampleProduct);

    const product = await getProduct({ productId: sampleProduct.id });
    expect(product).toEqual(sampleProduct);
  });
});
