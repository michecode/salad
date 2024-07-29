"use server";
import { addToCart } from "./cart";

export const addToCartAction = async ({ productId, cartId }: { productId: string, cartId: string | null }) => {
  return await addToCart({ productId, cartId });
};