'use client';
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from 'lucide-react';

export const AddToCartButton = ({ productId }: { productId: string }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const cartId = localStorage.getItem('salad-cart-id');

  return (
    <Button onClick={() => {}} disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" data-testid="loading-spinner"/>}
      Add to Cart
    </Button>
  )
};