"use server";
import { addToCart, removeAllItemsByProductFromCart, removeItemFromCart } from "./cart";

export const addToCartAction = async ({ productId, cartId }: { productId: string, cartId: string | null }) => {
  return await addToCart({ productId, cartId });
};

export const removeItemFromCartAction = async ({ itemId }: { itemId: string }) => {
  return await removeItemFromCart({ itemId });
};

export const removeAllItemsByProductFromCartAction = async ({ productId, cartId }: { productId: string, cartId: string }) => {
  return await removeAllItemsByProductFromCart({ productId, cartId });
}