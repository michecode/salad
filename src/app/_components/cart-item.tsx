"use client";
import { type CartItem } from "@prisma/client";
import { useProduct } from '../hooks/useProduct';
import { Button } from "./ui/button";
import { TrashIcon, MinusIcon, PlusIcon } from "lucide-react";
import { addToCartAction, removeAllItemsByProductFromCartAction, removeItemFromCartAction } from "~/lib/actions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function CartItem({ cartId, item }: { cartId: string, item: CartItem }) {
  const { data: product, isLoading } = useProduct({ productId: item.productId });
  const queryClient = useQueryClient();

  const handleAdd = async () => {
    const response = await addToCartAction({ productId: item.productId, cartId });
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: [ 'cart', cartId ] });
      toast(response.message);
    }
  };

  const handleRemove = async () => {
    const response = await removeItemFromCartAction({ itemId: item.id });
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: [ 'cart', cartId ] });
      toast(response.message);
    }
  };

  const handleRemoveAll = async () => {
    const response = await removeAllItemsByProductFromCartAction({ productId: item.productId, cartId });
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: [ 'cart', cartId ] });
      toast(response.message);
    }
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
    <div className="flex space-x-2">
      <img src={product.thumbnailUrl}/>
      <p>x{item.quantity}</p>
      <p>${item.price}</p>
      <Button onClick={handleRemoveAll} variant="outline" size="icon">
        <TrashIcon />
      </Button>
      <Button onClick={handleRemove} variant="outline" size="icon">
        <MinusIcon />
      </Button>
      <Button onClick={handleAdd} variant="outline" size="icon">
        <PlusIcon />
      </Button>
    </div>
  );
};