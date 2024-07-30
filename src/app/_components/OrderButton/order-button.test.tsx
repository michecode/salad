import { describe, test, expect, vi, beforeEach, it } from "vitest";
import { fireEvent, screen, waitFor, render, act } from '@testing-library/react';

import { OrderButton } from './order-button';
import { placeOrderAction } from "../../../lib/actions";

const customRender = (children: React.ReactNode) => {
  return render(
    <div>
      {children}
    </div>
  );
};

vi.mock('~/app/contexts/cart-id', () => ({
  useCartIdContext: vi.fn().mockReturnValue([ 'test-cart-id', vi.fn() ]),
}));

vi.mock('~/lib/actions', () => ({
  placeOrderAction: vi.fn().mockResolvedValue({
    success: true,
    message: 'Order placed successfully',
    order: {
      totalCost: 10,
      id: 'random-id',
    }
  }),
}));

describe('Order Button', () => {
  const testCartId = 'test-cart';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders', () => {
    render(<OrderButton cartId={testCartId} />);
    const cartButton = screen.getByRole('button');
    expect(cartButton).toBeInTheDocument();
  });

  it('alerts', async () => {
    render(<OrderButton cartId={testCartId} />);
    fireEvent.click(screen.getByRole('button'));

    expect(placeOrderAction).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(screen.getByTestId('alert-dialog-header')).toBeInTheDocument();
    });
  });

  it('alerts with success', async () => {
    render(<OrderButton cartId={testCartId} />);
    fireEvent.click(screen.getByRole('button'));

    const el = await screen.findByText('Order Placed');
    expect(el).toBeInTheDocument();
  });

  it('alerts with failure', async () => {
    vi.mocked(placeOrderAction).mockResolvedValue({
      success: false,
      message: 'Order Failed',
    });

    render(<OrderButton cartId={testCartId} />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Order Failed')).toBeInTheDocument();
    });
  })
});