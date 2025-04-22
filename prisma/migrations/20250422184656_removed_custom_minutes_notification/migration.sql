/*
  Warnings:

  - The values [CustomTimes] on the enum `NotificationTime` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `CustomMinutes` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationTime_new" AS ENUM ('ManuallyEnter', 'SpecificTimes');
ALTER TABLE "Notification" ALTER COLUMN "NotificationTime" TYPE "NotificationTime_new" USING ("NotificationTime"::text::"NotificationTime_new");
ALTER TYPE "NotificationTime" RENAME TO "NotificationTime_old";
ALTER TYPE "NotificationTime_new" RENAME TO "NotificationTime";
DROP TYPE "NotificationTime_old";
COMMIT;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "CustomMinutes";
