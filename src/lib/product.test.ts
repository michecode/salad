import { prismaMock } from '../../setupTests';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { getAllProducts, getProduct } from './product';

describe('product prisma', () => {
  beforeEach(() => {
    prismaMock.product.create.mockResolvedValue({
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
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test.todo('should get product', async () => {
    const product = await getProduct({ productId: 'test-id' });
    console.log(product);
    expect(product).not.toBeNull();
  });

  test.todo('should not return a product', async () => {
    const product = await getProduct({ productId: 'wrong-id' });
    expect(product).toBeNull();
  });

  test.todo('should get all products', async () => {
    const product = await getAllProducts(undefined, undefined);
    expect(product).toHaveLength(1);
  })
});
