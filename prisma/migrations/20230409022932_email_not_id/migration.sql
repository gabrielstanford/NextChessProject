/*
  Warnings:

  - You are about to drop the column `userId` on the `Level` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `Level` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Level" DROP CONSTRAINT "Level_userId_fkey";

-- DropIndex
DROP INDEX "Level_userId_key";

-- AlterTable
ALTER TABLE "Level" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Level_userEmail_key" ON "Level"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
