import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const productRouter = createTRPCRouter({
  getProduct: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const product = await ctx.db.product.findUnique({
      where: {
        id: input
      }
    });
    return product;
  }),

  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    const product = await ctx.db.product.findMany();
    return product ?? null;
  }),
});