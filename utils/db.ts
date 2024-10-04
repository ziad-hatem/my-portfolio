import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const databaseUrl = process.env.DATABASE_URL;
console.log(`Database URL: ${databaseUrl}`);

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV == "production") globalThis.prisma = db;
