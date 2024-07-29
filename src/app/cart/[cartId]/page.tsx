import Link from "next/link";
import { CartItem } from "../../_components/cart-item";
import { Button } from "../../_components/ui/button";
import { getCart } from "~/lib/cart";

export default async function Cart({ params }: { params: { cartId: string } }) {
  const cart = await getCart({ cartId: params.cartId });

  if (!cart) {
    return (
      <main>
        <div>
          <p>Your shopping cart is empty!</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div>
        <Button asChild>
          <Link href={`/checkout/${cart.id}`}>Checkout</Link>
        </Button>
        {cart.items.map((item) => (
          <CartItem
            key={`cartitem-${item.id}`}
            item={item}
            cartId={cart.id}
          />
        ))}
      </div>
    </main>
  );
}
