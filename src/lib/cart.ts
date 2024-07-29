import { Cart, CartItem } from "@prisma/client";
import { db } from "~/server/db";

interface CartWithItems extends Cart {
  items: CartItem[];
}

export const addToCart = async ({ cartId, productId }: { cartId: string, productId: string }) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return { success: false, message: 'product not found' };
    }

    let cart: CartWithItems | null;
    if (!cartId) {
      cart = await db.cart.create({
        data: {},
        include: { items: true },
      });
    } else {
      cart = await db.cart.findUnique({
        where: {
          id: cartId,
        },
        include: { items: true },
      });
    }

    if (!cart) {
      return { success: false, message: 'cart not found' };
    }

    // Check if the item already exists in the cart
    const existingCartItem = cart.items.find(
      (item) => item.productId === productId,
    );

    if (existingCartItem) {
      // Update the quantity if the item already exists
      await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 },
      });
    } else {
      // Add a new cart item if it doesn't exist
      await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1,
          price: product.price,
        },
      });
    }

    return { success: true, message: "Item added to cart successfully", cart };
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return { success: false, message: 'Failed to add item to cart' };
  }
}

export const getCart = async ({ cartId }: { cartId: string }) => {
  return await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: { items: true }
  });
};
