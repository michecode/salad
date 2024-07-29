import { db } from "~/server/db";

export const getProduct = async ({ productId }: { productId: string | null }) => {
  const product = await db.product.findUnique({
    where: {
      id: productId ?? undefined,
    }
  });
  return product;
}

export const getAllProducts = async () => {
  const products = await db.product.findMany();
  return products ?? null;
}