"use client";
import { Button } from "../ui/button";
import { Loader2 } from 'lucide-react';
import { addToCartAction } from "~/lib/actions";
import { toast } from "sonner";
import { useState } from "react";
import { useCartIdContext } from "~/app/contexts/cart-id";

export const AddToCartButton = ({ productId }: { productId: string }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ cartId, setCartId ] = useCartIdContext();

  const handleAdd = async () => {
    setIsLoading(true);
    const response = await addToCartAction({ productId, cartId });
    if (response.success && response.cart?.id) {
      setCartId(response.cart.id);
      toast(<p data-testid="toast">{response.message}</p>);
    } else {
      console.log('faield');
      toast(<p data-testid="toast">{response.message}</p>);
    }
    setIsLoading(false);
  };

  return (
    <Button onClick={handleAdd} disabled={isLoading} size="sm">
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" data-testid="loading-spinner"/>}
      Add to Cart
    </Button>
  )
};