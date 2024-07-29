"use client";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Loader2 } from 'lucide-react';
import { placeOrderAction } from "~/lib/actions";
import { useState } from "react";
import { type Order } from "@prisma/client";
import Link from "next/link";
import { useCartIdContext } from "~/app/contexts/cart-id";

interface OrderResponse {
  success: boolean;
  message: string;
  order?: Order | undefined;
  error?: unknown;
}

export const OrderButton = ({ cartId, recipient, address }: { cartId: string, recipient: string, address: string }) => {
  const [ _, setCartId ] = useCartIdContext();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ orderResponse, setOrderResponse ] = useState<OrderResponse | null>(null);
  const [ isOpen, setIsOpen ] = useState(false);

  const handleAdd = async () => {
    setIsLoading(true);
    const response = await placeOrderAction({ cartId, recipient, address });
    if (response.success) {
      setCartId(null);
    }
    setOrderResponse(response);
    setIsOpen(true);
    setIsLoading(false);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Button onClick={handleAdd} disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" data-testid="loading-spinner"/>}
        Place Order
      </Button>
      <AlertDialog open={isOpen} onOpenChange={toggleOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Order {orderResponse?.success ? 'Placed' : 'Failed'}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Thanks! We&apos;re getting right to work on shipping your order.
            <br/>
            <br/>
            Order ID: {orderResponse?.order?.id}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Link href="/">
              <AlertDialogAction>Return Home</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
};