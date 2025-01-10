import {PrismaClient} from "@prisma/client";

export const Prisma = (globalThis as any).Prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") (globalThis as any).prisma = Prisma;
