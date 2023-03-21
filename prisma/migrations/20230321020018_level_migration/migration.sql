-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level1" INTEGER NOT NULL,
    "level2" INTEGER NOT NULL,
    "level3" INTEGER NOT NULL,
    "level4" INTEGER NOT NULL,
    "level5" INTEGER NOT NULL,
    "level6" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
