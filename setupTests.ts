import '@testing-library/jest-dom';
import { vi } from 'vitest';

export const mockTrpcClient = {
  cart: {
    addToCart: vi.fn(),
  }
}

vi.mock("src/trpc/server.ts", () => {
  return ({
    api: mockTrpcClient,
  });
});