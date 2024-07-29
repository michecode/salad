import { CartItem } from "@prisma/client";
import { db } from "~/server/db";

export const placeOrder = async ({ cartId, recipient, address }: { cartId: string, address: string, recipient: string }) => {
  try {
    const cart = await db.cart.findUnique({
      where: {
        id: cartId
      },
      include: { items: true }
    });

    if (!cart) {
      return { success: false, message: 'Invalid cart id' };
    }

    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await db.order.create({
      data: {
        totalCost: subtotal,
        recipient,
        address,
      }
    });

    const orderItemData = cart.items.map((cartItem: CartItem) => ({
      orderId: order.id,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      price: cartItem.price,
    }));

    await db.orderItem.createMany({
      data: orderItemData,
    });

    // Delete items first
    await db.cartItem.deleteMany({
      where: {
        cartId
      }
    });

    await db.cart.delete({
      where: {
        id: cartId
      }
    });


    return { success: true, message: 'Order placed successfully', order };
  } catch (e) {
    return { success: false, message: 'Order failed', error: e };
  }
};