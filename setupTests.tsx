import '@testing-library/jest-dom';
import 'vitest-localstorage-mock';
import { vi } from 'vitest';

vi.mock('@prisma/client', () => {
  const originalModule = vi.importActual('@prisma/client');
  return {
    ...originalModule,
    PrismaClient: {
      prototype: {
        product: {
          findMany: vi.fn(),
          findUnique: vi.fn(),
          create: vi.fn(),
          update: vi.fn(),
          delete: vi.fn(),
        },
        cart: {
          findMany: vi.fn(),
          findUnique: vi.fn(),
          create: vi.fn(),
          update: vi.fn(),
          delete: vi.fn(),
        }
      },
    },
  };
});