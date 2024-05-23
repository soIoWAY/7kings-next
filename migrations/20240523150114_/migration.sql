/*
  Warnings:

  - A unique constraint covering the columns `[promocode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "enteredPromocode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "promocode" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'unban',
ALTER COLUMN "balance" SET DEFAULT 1000;

-- CreateIndex
CREATE UNIQUE INDEX "User_promocode_key" ON "User"("promocode");
