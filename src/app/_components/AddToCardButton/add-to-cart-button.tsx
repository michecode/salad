"use client";
import { Button } from "../ui/button";
import { Loader2 } from 'lucide-react';
import { addToCartAction } from "~/lib/actions";
import { useFormStatus } from "react-dom";

export const AddToCartButton = ({ productId }: { productId: string }) => {
  const { pending } = useFormStatus();
  const cartId = localStorage.getItem('salad-cart-id');

  const handleAdd = async () => {
    const response = await addToCartAction({ productId, cartId });
    if (response.success && response.cart?.id) {
      localStorage.setItem('salad-cart-id', response.cart?.id);
    }
  };

  return (
    <Button onClick={handleAdd} disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" data-testid="loading-spinner"/>}
      Add to Cart
    </Button>
  )
};