"use client";
import { type CartItem, type Cart } from "@prisma/client";
import { useQuery } from "@tanstack/react-query"

interface CartWithItems extends Cart {
  items: CartItem[];
}

const getShoppingCart = async (cartId: string | null) => {
  const response = await fetch(`/api/cart?id=${cartId}`);
  return await response.json();
};

const parse = (response: CartWithItems) => {
  return response;
};

export const useCart = () => {
  let cartId = null;

  if (typeof window !== 'undefined') {
    cartId = localStorage.getItem('salad-cart-id');
  }

  return useQuery({
    queryKey: [ 'cart', cartId ],
    queryFn: async () => getShoppingCart(cartId),
    select: response => parse(response),
    enabled: !!cartId,
  });
};