import { Cart, CartItem } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface CartWithItems extends Cart {
  items: CartItem[];
}

export const cartRouter = createTRPCRouter({
  addToCart: publicProcedure
    .input(
      z.object({
        cartId: z.string().cuid().nullable(),
        productId: z.string().cuid(),
        quantity: z.number().int().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { productId, quantity, cartId } = input;
      try {
        const product = await ctx.db.product.findUnique({
          where: {
            id: productId,
          },
        });

        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Product Not Found",
          });
        }

        let cart: CartWithItems | null;
        if (!cartId) {
          cart = await ctx.db.cart.create({
            data: {},
            include: { items: true },
          });
        } else {
          cart = await ctx.db.cart.findUnique({
            where: {
              id: cartId,
            },
            include: { items: true },
          });
        }

        if (!cart) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Cart not found",
          });
        }

        // Check if the item already exists in the cart
        const existingCartItem = cart.items.find(
          (item) => item.productId === productId,
        );

        if (existingCartItem) {
          // Update the quantity if the item already exists
          await ctx.db.cartItem.update({
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + quantity },
          });
        } else {
          // Add a new cart item if it doesn't exist
          await ctx.db.cartItem.create({
            data: {
              cartId: cart.id,
              productId,
              quantity,
              price: product.price,
            },
          });
        }

        return { success: true, message: "Item added to cart successfully", cart };
      } catch (error) {
        console.error("Error adding item to cart:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while adding the item to the cart",
        });
      }
    }),

  getCart: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const cart = await ctx.db.cart.findUnique({
      where: {
        id: input,
      },
      include: { items: true }
    });
    return cart;
  }),
});
