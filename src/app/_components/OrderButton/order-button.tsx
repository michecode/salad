"use client";
import { Button } from "../ui/button";
import { Loader2 } from 'lucide-react';
import { placeOrderAction } from "~/lib/actions";
import { toast } from "sonner";
import { useState } from "react";

export const OrderButton = ({ cartId, recipient, address }: { cartId: string, recipient: string, address: string }) => {
  const [ isLoading, setIsLoading ] = useState(false);

  const handleAdd = async () => {
    setIsLoading(true);
    const response = await placeOrderAction({ cartId, recipient, address });
    if (response.success) {
      localStorage.removeItem('salad-cart-id');
      toast(response.message);
    }
    setIsLoading(false);
  };

  return (
    <Button onClick={handleAdd} disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" data-testid="loading-spinner"/>}
      Place Order
    </Button>
  )
};