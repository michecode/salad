"use client";
import { Button } from "../ui/button";
import { Loader2 } from 'lucide-react';
import { addToCartAction } from "~/lib/actions";
import { toast } from "sonner";
import { useState } from "react";

export const AddToCartButton = ({ productId }: { productId: string }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const cartId = localStorage.getItem('salad-cart-id');

  const handleAdd = async () => {
    setIsLoading(true);
    const response = await addToCartAction({ productId, cartId });
    if (response.success && response.cart?.id) {
      localStorage.setItem('salad-cart-id', response.cart?.id);
      toast(response.message);
    }
    setIsLoading(false);
  };

  return (
    <Button onClick={handleAdd} disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" data-testid="loading-spinner"/>}
      Add to Cart
    </Button>
  )
};