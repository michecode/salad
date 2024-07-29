import { db } from "~/server/db";

export const getProduct = async ({ productId }: { productId: string }) => {
  const product = await db.product.findUnique({
    where: {
      id: productId
    }
  });
  return product;
}

export const getAllProducts = async () => {
  const products = await db.product.findMany();
  return products ?? null;
}