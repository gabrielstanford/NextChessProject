/*
  Warnings:

  - You are about to drop the column `fifthProbCorrect` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstProbCorrect` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fourthProbCorrect` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isNew` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `numCorrect` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `secondProbCorrect` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seventhProbCorrect` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sixthProbCorrect` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `thirdProbCorrect` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Sighting` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fifthProbCorrect",
DROP COLUMN "firstProbCorrect",
DROP COLUMN "fourthProbCorrect",
DROP COLUMN "isNew",
DROP COLUMN "numCorrect",
DROP COLUMN "secondProbCorrect",
DROP COLUMN "seventhProbCorrect",
DROP COLUMN "sixthProbCorrect",
DROP COLUMN "thirdProbCorrect",
ADD COLUMN     "email" TEXT NOT NULL;

-- DropTable
DROP TABLE "Sighting";

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "numCorrect" INTEGER NOT NULL DEFAULT 0,
    "firstProbCorrect" BOOLEAN NOT NULL DEFAULT false,
    "secondProbCorrect" BOOLEAN NOT NULL DEFAULT false,
    "thirdProbCorrect" BOOLEAN NOT NULL DEFAULT false,
    "fourthProbCorrect" BOOLEAN NOT NULL DEFAULT false,
    "fifthProbCorrect" BOOLEAN NOT NULL DEFAULT false,
    "sixthProbCorrect" BOOLEAN NOT NULL DEFAULT false,
    "seventhProbCorrect" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Level_userId_key" ON "Level"("userId");

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
