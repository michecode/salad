import { notFound } from "next/navigation";
import { getCart } from "~/lib/cart";
import { CheckoutItem } from "../../_components/checkout-item";
import { OrderButton } from "~/app/_components/OrderButton/order-button";

export default async function Checkout({ params }: { params: { cartId: string } }) {
  const cart = await getCart({ cartId: params.cartId });

  const subtotal = cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!cart) {
    return notFound();
  }

  return (
    <main className="mx-64 mb-10">
      <p className="font-bold text-4xl mb-2">Checkout</p>
      <div className="flex space-x-2 justify-between">
        <div className="flex flex-col space-y-2 w-1/2">
          {cart.items.map((item) => <CheckoutItem item={item} key={`ck-item-${item.id}`} />)}
        </div>
        <div className="flex flex-col space-x-4">
          <p className="font-bold text-4xl">Subtotal: ${subtotal}</p>
          <OrderButton cartId={params.cartId} recipient="Maddy" address="Maddyhouse"/>
        </div>
      </div>
    </main>
  );
};
