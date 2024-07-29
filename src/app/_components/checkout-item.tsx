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
    <div className="flex space-x-2 border p-4 rounded-xl justify-between">
      <div className="flex space-x-2">
        <img src={product.smallImageUrl} className="w-[100px] h-[100px] object-contain border p-1 rounded-lg"/>
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-xl">${item.quantity * item.price}</p>
          <p>Quantity: {item.quantity}</p>
          {item.quantity > 1 && <p>${item.price}</p>}
        </div>
      </div>
    </div>
  );
};
