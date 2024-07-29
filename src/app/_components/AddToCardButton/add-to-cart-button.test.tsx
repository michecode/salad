import { describe, test, expect, vi, beforeEach } from "vitest";
import { fireEvent, screen, waitFor, render } from '@testing-library/react';

import { AddToCartButton } from "./add-to-cart-button";
import { addToCartAction } from "~/lib/actions";

const customRender = (children: React.ReactNode) => {
  return render(
    <div>
      {/* <Toaster/> */}
      {children}
    </div>
  );
};

vi.mock('~/app/contexts/cart-id', () => ({
  useCartIdContext: vi.fn().mockReturnValue([ 'test-cart-id', vi.fn() ]),
}));

vi.mock('~/lib/actions', () => ({
  addToCartAction: vi.fn().mockReturnValue({
    success: true,
    cart: {
      id: 'test',
    }
  }),
}))

describe('Add to Cart Button', () => {
  const mockProductId = 'test';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Button Renders', () => {
    render(<AddToCartButton productId={mockProductId} />);
    const cartButton = screen.getByRole('button');
    expect(cartButton).toBeInTheDocument();
  });

  test('loading spinner when clicked', async () => {
    customRender(<AddToCartButton productId={mockProductId} />);
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      // expect(screen.findByText('Item Added to Cart Successfully')).toBeInTheDocument();
    });
  });

  test.todo('fails to add item', async () => {
    vi.mocked(addToCartAction).mockImplementation(async () => new Promise((resolve) => setTimeout(() => {
      resolve({ success: false, message: 'Failed to add item' });
    }, 100)));

    render(<AddToCartButton productId={mockProductId} />)
    fireEvent.click(screen.getByRole('button'));
  });
});