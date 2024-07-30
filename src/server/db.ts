import { PrismaClient } from "@prisma/client";

// @DEV: Removed env access because this app wont be deploying to prod and I need to do integration tests
// import { env } from "~/env";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const createPrismaClient = () =>
  // new PrismaClient({
  //   log:
  //     env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  // });
  new PrismaClient({
    log: [ "query", "error", "warn" ],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = db;
// if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
