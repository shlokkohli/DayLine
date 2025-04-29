/*
  Warnings:

  - You are about to drop the column `format` on the `Summary` table. All the data in the column will be lost.
  - Added the required column `SummaryFormat` to the `Summary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Summary" DROP COLUMN "format",
ADD COLUMN     "SummaryFormat" "SummaryFormat" NOT NULL;
