"use client";
import { type CartItem } from "@prisma/client";
import { useProduct } from '../hooks/useProduct';
import { Button } from "./ui/button";
import { TrashIcon, MinusIcon, PlusIcon } from "lucide-react";
import { addToCartAction, removeAllItemsByProductFromCartAction, removeItemFromCartAction } from "~/lib/actions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function CartItem({ cartId, item, refresh }: { cartId: string, item: CartItem, refresh: Function }) {
  const { data: product, isLoading } = useProduct({ productId: item.productId });
  const queryClient = useQueryClient();

  const handleAdd = async () => {
    const response = await addToCartAction({ productId: item.productId, cartId });
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: [ 'cart', cartId ] });
      refresh();
    }
    toast(response.message);
  };

  const handleRemove = async () => {
    const response = await removeItemFromCartAction({ itemId: item.id });
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: [ 'cart', cartId ] });
      refresh();
    }
    toast(response.message);
  };

  const handleRemoveAll = async () => {
    const response = await removeAllItemsByProductFromCartAction({ productId: item.productId, cartId });
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: [ 'cart', cartId ] });
      refresh();
    }
    toast(response.message);
  };

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
    <div className="flex space-x-2 border p-4 rounded-xl justify-between shadow-md">
      <div className="flex space-x-2">
        <img src={product.smallImageUrl} className="w-[100px] h-[100px] object-contain border p-1 rounded-lg"/>
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-xl">${item.quantity * item.price}</p>
          <p>Quantity: {item.quantity}</p>
          {item.quantity > 1 && <p>${item.price}</p>}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Button onClick={handleAdd} variant="outline" size="icon">
          <PlusIcon />
        </Button>
        <Button onClick={handleRemove} variant="outline" size="icon">
          <MinusIcon />
        </Button>
        <Button onClick={handleRemoveAll} variant="outline" size="icon">
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};