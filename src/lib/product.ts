import { Product } from "@prisma/client";
import { db } from "~/server/db";

const PAGE_SIZE = 51; // Divisible by 3 since theres 3 cols

// @DEV: Mostly just for testing
export const createProduct = async (product: Product) => {
  await db.product.create({
    data: product,
  });
};

export const getProduct = async ({
  productId,
}: {
  productId: string;
}) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  return product;
};

export const totalProductPages = async (museum: string | undefined) => {
  const totalProducts = await db.product.count({
    where: {
      museumId: museum,
    }
  });
  return Math.ceil(totalProducts / PAGE_SIZE);
};

export const getAllProducts = async (page: number = 1, museum: string | undefined) => {
  const products = await db.product.findMany({
    where: {
      museumId: museum,
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: {
      id: "asc",
    },
  });

  return products ?? null;
};
