import 'server-only';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import type { PrismaClient as PrismaClientType } from '@prisma/client';

let PrismaClient: any;
if (typeof window === "undefined") {
  // Bypass Turbopack's static bundler by forcing a runtime CommonJS require
  PrismaClient = require('@prisma/client').PrismaClient;
}

const globalForPrisma = global as unknown as { prisma: PrismaClientType };

export const prisma: PrismaClientType = globalForPrisma.prisma || (() => {
  if (typeof window === "undefined" && PrismaClient) {
    // Prisma 7 requires explicit adapter instantiation since 'url' is removed from schema
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  }
  return null as any;
})();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
