/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Summary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Summary_ownerId_key" ON "Summary"("ownerId");
