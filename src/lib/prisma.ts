import 'server-only';
import type { PrismaClient as PrismaClientType } from '@prisma/client';

let PrismaClient: any;
if (typeof window === "undefined") {
  // Bypass Turbopack's static bundler by forcing a runtime CommonJS require
  PrismaClient = require('@prisma/client').PrismaClient;
}

const globalForPrisma = global as unknown as { prisma: PrismaClientType };

export const prisma: PrismaClientType = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
