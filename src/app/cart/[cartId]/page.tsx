import Link from "next/link";
import { CartItem } from "../../_components/cart-item";
import { Button } from "../../_components/ui/button";
import { getCart } from "~/lib/cart";
import { revalidatePath } from "next/cache";

export default async function Cart({ params }: { params: { cartId: string } }) {
  const cart = await getCart({ cartId: params.cartId });

  const subtotal = cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const refreshData = async () => {
    "use server";
    revalidatePath('/cart');
  };

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
    <main className="mx-64 mb-10">
      <p className="font-bold text-4xl mb-2">Shopping Cart</p>
      <div className="flex space-x-2 justify-between">
        <div className="flex flex-col space-y-2 w-1/2">
          {cart.items.map((item) => (
            <CartItem
              key={`cartitem-${item.id}`}
              item={item}
              cartId={cart.id}
              refresh={refreshData}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-4">
          <p className="font-bold text-4xl">Total: ${subtotal}</p>
          <Button asChild>
            <Link href={`/checkout/${cart.id}`}>Proceed to Checkout</Link>
          </Button>
                </div>
        </div>
    </main>
  );
}
