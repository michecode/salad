import { describe, test, expect, vi, beforeEach } from "vitest";
import { fireEvent, screen, waitFor, render } from '@testing-library/react';
import { Cart, CartItem } from "@prisma/client";

import { AddToCartButton } from "./add-to-cart-button";
import { addToCartAction } from "~/lib/actions";

interface CartWithItems extends Cart {
  items: CartItem[]
}

vi.mock('~/lib/actions', () => ({
  addToCartAction: vi.fn(),
}))

vi.mock('react-dom', () => ({
  ...vi.importActual('react-dom'),
  useFormStatus: vi.fn().mockReturnValue({
    pending: false,
  }),
}));

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

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('Button Renders', () => {
    render(<AddToCartButton productId={mockProductId} />);
    const cartButton = screen.getByRole('button');
    expect(cartButton).toBeInTheDocument();
  });

  test('loading spinner when clicked', async () => {
    vi.mocked(addToCartAction).mockImplementation(async () => new Promise(resolve => setTimeout(resolve, 200)));

    render(<AddToCartButton productId={mockProductId} />);
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      expect(screen.getByText('Item added to cart')).toBeInTheDocument();
    });
  });

  test('Adds to non-existant cart and sets cart id', async () => {
    vi.mocked(addToCartAction).mockImplementation(async () => new Promise((resolve) => setTimeout(() => {
      resolve({ succes: true, message: 'Item added to cart successfully', cart: mockCart })
    }, 200)));
    expect(localStorage.getItem('salad-cart-id')).toBeNull();

    render(<AddToCartButton productId={mockProductId} />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(addToCartAction).toHaveBeenCalledWith({ productId: mockProductId, cartId: null });
      expect(localStorage.getItem('salad-cart-id')).toEqual(mockCart.id);
    })
  });

  test('Adds to existing cart', async () => {
    localStorage.setItem('salad-cart-id', mockCart.id);

    render(<AddToCartButton productId={mockProductId} />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(addToCartAction).toHaveBeenCalledWith({ productId: mockProductId, cartId: 'salad-cart-id' });
    })
  })

  test('fails to add item', async () => {
    vi.mocked(addToCartAction).mockImplementation(async () => new Promise((resolve) => setTimeout(() => {
      resolve({ success: false, message: 'Failed to add item' });
    }, 100)));

    render(<AddToCartButton productId={mockProductId} />)
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Failed to add item')).toBeInTheDocument();
    })
  });
});