"use client";
import { CartItem } from "../_components/cart-item";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { data: cart, isLoading } = useCart();

  if (isLoading) {
    return (
      <main>
        <div>
          <p>laoding..</p>
        </div>
      </main>
    );
  }

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
        {cart.items.map((item) => (<CartItem item={item} productId={item.productId} cartId={cart.id} />))}
      </div>
    </main>
  );
};