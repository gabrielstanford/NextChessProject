/*
  Warnings:
  - You are about to drop the column `level1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `level2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `level3` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `level4` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `level5` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `level6` on the `User` table. All the data in the column will be lost.
*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "level1",
DROP COLUMN "level2",
DROP COLUMN "level3",
DROP COLUMN "level4",
DROP COLUMN "level5",
DROP COLUMN "level6",
ADD COLUMN     "fifthProbCorrect" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "firstProbCorrect" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fourthProbCorrect" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isNew" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "numCorrect" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "secondProbCorrect" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "seventhProbCorrect" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sixthProbCorrect" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "thirdProbCorrect" BOOLEAN NOT NULL DEFAULT false;