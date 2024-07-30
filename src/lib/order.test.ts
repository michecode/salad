import { prismaMock } from '../../setupTests';
import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { getAllProducts, getProduct } from './product';
import { placeOrder } from './order';

// fails when no cart id
// subtotal calculates right

describe('order prisma', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fails when cart id is null', async () => {
    // @ts-expect-error testing null
    const orderResponse = await placeOrder({ cartId: null, recipient: 'maddy', address: 'maddyhouse' });
    expect(orderResponse.success).toBeFalsy();
  });
});
