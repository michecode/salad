import { prismaMock } from '../../setupTests';
import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { getAllProducts, getProduct } from './product';
import { placeOrder } from './order';

// fails when no cart id
// subtotal calculates right

describe('order prisma', () => {
  const cartId = 'special-cart';
  const recipient = 'Maddy';
  const address = '123 Awesome St.';

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

  it('places order successfully', async () => {
    prismaMock.cart.findUnique.mockResolvedValue({
      id: cartId,
      createdAt: new Date(),
      updatedAt: new Date(),
      // @ts-expect-error cant type properly here
      items: [{ productId: 'prod-1', price: 100, quantity: 2 }]
    });
    prismaMock.order.create.mockResolvedValue({
      id: 'order-id', orderDate: new Date(), totalCost: 200,
      recipient,
      address,
    });
    prismaMock.orderItem.createMany.mockResolvedValue({
      count: 1
    });
    prismaMock.cartItem.deleteMany.mockResolvedValue({
      count: 1
    });
    prismaMock.cart.delete.mockResolvedValue({
      id: '',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const orderResponse = await placeOrder({ cartId, recipient, address });
    expect(orderResponse.success).toBeTruthy();
    expect(prismaMock.cart.findUnique).toHaveBeenCalledWith({ where: { id: cartId }, include: { items: true } });
    expect(prismaMock.order.create).toHaveBeenCalled();
    expect(prismaMock.orderItem.createMany).toHaveBeenCalled();
    expect(prismaMock.cartItem.deleteMany).toHaveBeenCalledWith({ where: { cartId } });
    expect(prismaMock.cart.delete).toHaveBeenCalledWith({ where: { id: cartId } });
  });
});
