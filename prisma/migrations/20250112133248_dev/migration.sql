/*
  Warnings:

  - Added the required column `slug` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "slug" TEXT NOT NULL;
