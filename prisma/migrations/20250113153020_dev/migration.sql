/*
  Warnings:

  - You are about to drop the column `postId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `subCategories` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `subCategories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_userId_fkey";

-- DropForeignKey
ALTER TABLE "subCategories" DROP CONSTRAINT "subCategories_userId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subCategories" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subCategories" ADD CONSTRAINT "subCategories_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
