import { PrismaClient } from "@prisma/client";
export const Prisma = globalThis.Prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production")
    globalThis.prisma = Prisma;
