import { Cart, CartItem } from "@prisma/client";
import { db } from "~/server/db";

interface CartWithItems extends Cart {
  items: CartItem[];
}

export const addToCart = async ({
  cartId,
  productId,
}: {
  cartId: string | null;
  productId: string;
}) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return { success: false, message: "Product Not Found" };
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
      return { success: false, message: "Cart Not Found" };
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

    return { success: true, message: "Item Added to Cart Successfully", cart };
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return { success: false, message: "Failed to Add Item to Cart" };
  }
};

export const removeItemFromCart = async ({ itemId }: { itemId: string }) => {
  try {
    const cartItem = await db.cartItem.findUnique({
      where: {
        id: itemId,
      }
    });

    if (!cartItem) {
      return { success: false, message: 'Cart Item Not Found' }
    }

    if (cartItem?.quantity === 1) {
      await db.cartItem.delete({
        where: {
          id: itemId,
        },
      });
    } else {
      await db.cartItem.update({
        where: {
          id: itemId
        },
        data: {
          quantity: cartItem.quantity - 1,
        }
      })
    }
    return { success: true, message: "Removed Item From Cart" };
  } catch (e) {
    return { success: false, message: "Failed to Remove Item From Cart" };
  }
};

export const removeAllItemsByProductFromCart = async ({
  productId,
  cartId,
}: {
  productId: string;
  cartId: string;
}) => {
  try {
    await db.cartItem.deleteMany({
      where: {
        cartId,
        productId,
      },
    });
    return { success: true, message: "Removed item from cart" };
  } catch (e) {
    return { success: false, message: "Failed to remove item from cart" };
  }
};

export const getCart = async ({ cartId }: { cartId: string | null }) => {
  return await db.cart.findUnique({
    where: {
      id: cartId ?? undefined,
    },
    include: { items: true },
  });
};
