import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy, mockReset } from 'vitest-mock-extended';

import { db } from '~/server/db';

vi.mock('~/server/db', () => ({
  db: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>;