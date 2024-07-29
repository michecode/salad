"use server";
import { addToCart, removeAllItemsByProductFromCart, removeItemFromCart } from "./cart";
import { placeOrder } from "./order";

export const addToCartAction = async ({ productId, cartId }: { productId: string, cartId: string | null }) => {
  return await addToCart({ productId, cartId });
};

export const removeItemFromCartAction = async ({ itemId }: { itemId: string }) => {
  return await removeItemFromCart({ itemId });
};

export const removeAllItemsByProductFromCartAction = async ({ productId, cartId }: { productId: string, cartId: string }) => {
  return await removeAllItemsByProductFromCart({ productId, cartId });
}

export const placeOrderAction = async ({ cartId, recipient, address }: { cartId: string, address: string, recipient: string }) => {
  return await placeOrder({ cartId, recipient, address });
};