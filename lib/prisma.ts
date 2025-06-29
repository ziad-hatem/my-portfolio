import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

// Fallback DATABASE_URL if environment variable isn't loaded
// IMPORTANT: Replace with your actual database connection string
// This is a temporary solution - you should properly set up your .env file
if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL not found in environment variables, using fallback."
  );
  process.env.DATABASE_URL =
    "mysql://username:password@localhost:3306/portfolio";
}

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
