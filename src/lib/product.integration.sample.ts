import { prismaMock } from '../../setupTests';
import { afterEach, beforeAll, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { getAllProducts, getProduct } from './product';
import { seed } from '~/scripts/seed';

describe('product prisma', () => {
  // beforeAll(async () => {
  //   await seed();
  // })

  // afterEach(() => {
  //   vi.clearAllMocks();
  // });

  // it('')

  // it('should get a list of products', async () => {
  //   const products = await getAllProducts(undefined, undefined);
  //   console.log(products);
  //   expect(products.length).toBeGreaterThan(1);
  // });
});
