import { type CartItem } from "@prisma/client";
import { getProduct } from "~/lib/product";

export async function CheckoutItem({ item }: { item: CartItem }) {
  const product = await getProduct({ productId: item.productId });

  if (!product) { 
    return (
      <div>
        <p>Product Not Found</p>
      </div>
    )
  }

  return (
    <div className="flex space-x-2">
      <img src={product.thumbnailUrl}/>
      <p>x{item.quantity}</p>
      <p>${item.price}</p>
    </div>
  );
};