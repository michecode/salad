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
  let placeOrder: ({
    cartId,
    recipient,
    address,
  }: {
    cartId: string;
    address: string;
    recipient: string;
  }) => Promise<any>;

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

  beforeAll(async () => {
    vi.doUnmock("~/server/db");

    // Seed the database
    await seed();
    console.log("finished seed script");

    // Dynamically import getAllProducts after unmocking
    const productModule = await import("./product");
    createProduct = productModule.createProduct;
    const cartModule = await import('./cart');
    addToCart = cartModule.addToCart;
    const orderModule = await import("./order");
    placeOrder = orderModule.placeOrder;

    await createProduct(sampleProduct);
  });

  it("places an order", async () => {
    const cartResponse = await addToCart({
      cartId: null,
      productId: sampleProduct.id,
    });
    const order = await placeOrder({
      cartId: cartResponse.cart?.id as string,
      recipient: "maddy",
      address: "maddyhouse",
    });
    expect(order.success).toBe(true);
  });
});
