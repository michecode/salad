import { beforeAll, describe, test, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Cart, CartItem } from "@prisma/client";

import { AddToCartButton } from "./add-to-cart-button";
import { mockTrpcClient } from "../../../../setupTests";

interface CartWithItems extends Cart {
  items: CartItem[]
}

describe('Add to Cart Button', () => {
  const mockCartId = 'test';
  const mockProductId = 'test';
  const mockCartItem: CartItem = {
    id: 'test',
    cartId: 'test',
    productId: 'test',
    quantity: 1,
    price: 100,
  }
  const mockCart: CartWithItems = {
    id: 'cuid',
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [ mockCartItem ],
  }

  beforeAll(async () => {

  });

  test('Button Renders', () => {
    render(<AddToCartButton productId={mockProductId} />);
    const cartButton = screen.getByRole('button');
    expect(cartButton).toBeInTheDocument();
  });

  test('Adds to non-existant cart', async () => {
    mockTrpcClient.cart.addToCart.mockResolvedValue({ success: true });

    render(<AddToCartButton productId={mockProductId} />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockTrpcClient.cart.addToCart).toHaveBeenCalledWith(null, mockProductId, 1);
    })
  });

  test('Adds to existing cart', async () => {
    mockTrpcClient.cart.addToCart.mockResolvedValue({ success: true, message: 'Item added to cart', cart: mockCart });

    render(<AddToCartButton productId={mockProductId} />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockTrpcClient.cart.addToCart).toHaveBeenCalledWith(mockCartId, mockProductId, 1);
    })
  })

  test('Show a loading spinner when adding item', async () => {
    mockTrpcClient.cart.addToCart.mockImplementation(() =>
      new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000))
    );

    render(<AddToCartButton productId={mockProductId} />);
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      expect(screen.getByText('Item added to cart')).toBeInTheDocument();
    });
  });

  test('Handles non-existant product', async () => {
    mockTrpcClient.cart.addToCart.mockRejectedValue(new Error('Product not found'));

    render(<AddToCartButton productId="i_dont_exist" />)
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Failed to add item')).toBeInTheDocument();
    })
  });
});