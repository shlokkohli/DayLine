/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,date]` on the table `Summary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Summary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Summary" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Summary_ownerId_date_key" ON "Summary"("ownerId", "date");
