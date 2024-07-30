import { beforeAll, describe, expect, it, vi } from "vitest";
import { seed } from "../scripts/seed";
import { Product, Cart, CartItem } from "@prisma/client";

interface CartWithItems extends Cart {
  items: CartItem[];
}

describe("product prisma", () => {
  let createProduct: (product: Product) => Promise<any>;
  let addToCart: ({
    cartId,
    productId,
  }: {
    productId: string;
    cartId: string | null;
  }) => Promise<
    | {
        success: boolean;
        message: string;
        cart?: undefined;
      }
    | {
        success: boolean;
        message: string;
        cart: CartWithItems;
      }
  >;
  let removeItemFromCart: ({ itemId }: { itemId: string }) => Promise<{
    success: boolean;
    message: string;
  }>;
  let removeAllItemsByProductFromCart: ({
    productId,
    cartId,
  }: {
    productId: string;
    cartId: string;
  }) => Promise<{
    success: boolean;
    message: string;
  }>;

  const sampleProduct: Product = {
    id: Math.random().toString(),
    description: "Test product",
    altDescription: null,
    museum: "Test museum",
    museumId: "test-museum",
    museumBio: null,
    museumLocation: null,
    museumProfilePicture: "test-pic.jpg",
    museumProfilePictureThumbnail: "test-thumb.jpg",
    price: 1000,
    rawImageUrl: "test-raw.jpg",
    fullImageUrl: "test-full.jpg",
    imageUrl: "test-img.jpg",
    smallImageUrl: "test-small.jpg",
    thumbnailUrl: "test-thumb.jpg",
    blurHash: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const sampleProductTwo = {
    ...sampleProduct,
    id: Math.random().toString(),
  };
  const testCartId = Math.random().toString();
  const testCartIdTwo = Math.random().toString();

  beforeAll(async () => {
    vi.doUnmock("~/server/db");

    // Seed the database
    await seed();
    console.log("finished seed script");

    // Dynamically import getAllProducts after unmocking
    const productModule = await import("./product");
    createProduct = productModule.createProduct;
    const cartModule = await import("./cart");
    addToCart = cartModule.addToCart;
    removeItemFromCart = cartModule.removeItemFromCart;
    removeAllItemsByProductFromCart = cartModule.removeAllItemsByProductFromCart;

    await createProduct(sampleProduct);
    await createProduct(sampleProductTwo);
    await addToCart({ cartId: testCartId, productId: sampleProduct.id });
  });

  // @TODO: expand expects
  it("adds to empty cart", async () => {
    const cartResponse = await addToCart({
      cartId: null,
      productId: sampleProduct.id,
    });
    expect(cartResponse.success).toBe(true);
  });

  // @TODO: expand expects
  // it('adds new product to existing cart', async () => {
  //   const cartResponse = await addToCart({
  //     cartId: testCartId,
  //     productId: sampleProductTwo.id,
  //   });
  //   console.log({cartResponse})
  //   expect(cartResponse.success).toBe(true);
  // });

  // @TODO: expand expects
  // it('adds a second copy to an existing cart', async () => {
  //   const cartResponse = await addToCart({
  //     cartId: testCartId,
  //     productId: sampleProduct.id,
  //   });
  //   expect(cartResponse.success).toBe(true);
  // });

  // @TODO: expand expects
  // it('removes item from cart', async () => {
  //   const cartResponse = await addToCart({
  //     cartId: testCartIdTwo,
  //     productId: sampleProduct.id,
  //   });
  //   const cartItem = cartResponse.cart?.items.at(0);
  //   const cartRemoveResponse = await removeItemFromCart({ itemId: cartItem?.id });
  //   expect(cartRemoveResponse.success).toBe(true);
  // })

  // @TODO: expand expects
  it('removes all items from cart', async () => {
    const cartResponse = await addToCart({
      cartId: 'test3',
      productId: sampleProduct.id,
    });
    const cartResponse2 = await addToCart({
      cartId: 'test3',
      productId: sampleProduct.id,
    });
    const removeRes = await removeAllItemsByProductFromCart({ productId: sampleProduct.id, cartId: 'test-3' });
    expect(removeRes.success).toBe(true);
  });
});
