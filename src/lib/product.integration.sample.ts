import { prismaMock } from '../../setupTests';
import { afterEach, beforeAll, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { getAllProducts, getProduct } from './product';
import { seed } from '../scripts/seed';
import { PrismaClient } from '@prisma/client';


describe('product prisma', () => {
  beforeAll(async () => {
    vi.mock('~/server/db', async () => ({
      db: new PrismaClient({ log: ["query", "error", "warn"] }),
    }));

    await seed();
  });

  // afterEach(() => {
  //   vi.clearAllMocks();
  // });

  it('should get a list of products', async () => {
    const products = await getAllProducts(undefined, undefined);
    expect(products.length).toBeGreaterThan(1);
  });

  // it('')

  // it('should get a list of products', async () => {
  //   const products = await getAllProducts(undefined, undefined);
  //   console.log(products);
  //   expect(products.length).toBeGreaterThan(1);
  // });
});
