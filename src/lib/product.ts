import { db } from "~/server/db";

const PAGE_SIZE = 51; // Divisible by 3 since theres 3 cols

export const getProduct = async ({
  productId,
}: {
  productId: string | null;
}) => {
  const product = await db.product.findUnique({
    where: {
      id: productId ?? undefined,
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
