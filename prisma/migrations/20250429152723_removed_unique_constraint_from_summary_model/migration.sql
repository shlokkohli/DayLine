/*
  Warnings:

  - The values [Precise] on the enum `SummaryFormat` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SummaryFormat_new" AS ENUM ('Paragraph', 'Segmented');
ALTER TABLE "Summary" ALTER COLUMN "SummaryFormat" TYPE "SummaryFormat_new" USING ("SummaryFormat"::text::"SummaryFormat_new");
ALTER TYPE "SummaryFormat" RENAME TO "SummaryFormat_old";
ALTER TYPE "SummaryFormat_new" RENAME TO "SummaryFormat";
DROP TYPE "SummaryFormat_old";
COMMIT;

-- DropIndex
DROP INDEX "Summary_ownerId_date_key";
