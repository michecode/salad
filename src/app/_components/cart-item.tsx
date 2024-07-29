"use client";
import { type CartItem } from "@prisma/client";
import { useProduct } from '../hooks/useProduct';

export function CartItem({ productId, item }: { productId: string, item: CartItem }) {
  const { data: product, isLoading } = useProduct({ productId });

  if (isLoading) {
    return <div>
      <p>loading..</p>
    </div>
  }

  if (!product) {
    return (
      <div>
        <p>product not found</p>
      </div>
    );
  }

  return (
    <div>
      <img src={product.thumbnailUrl}/>
      <p>x{item.quantity}</p>
      <p>${item.price}</p>
    </div>
  );
};