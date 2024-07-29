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
    <main className="flex">
      <div>
        {cart.items.map((item) => <CheckoutItem item={item} key={`ck-item-${item.id}`} />)}
      </div>
      <div>
        <p>Subtotal: ${subtotal}</p>
        <OrderButton cartId={params.cartId} recipient="Maddy" address="Maddyhouse"/>
      </div>
    </main>
  );
};
