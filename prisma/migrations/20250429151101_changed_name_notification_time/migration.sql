/*
  Warnings:

  - The values [ManuallyEnter,SpecificTimes] on the enum `NotificationTime` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationTime_new" AS ENUM ('NoNotification', 'FixedIntervals');
ALTER TABLE "Notification" ALTER COLUMN "NotificationTime" TYPE "NotificationTime_new" USING ("NotificationTime"::text::"NotificationTime_new");
ALTER TYPE "NotificationTime" RENAME TO "NotificationTime_old";
ALTER TYPE "NotificationTime_new" RENAME TO "NotificationTime";
DROP TYPE "NotificationTime_old";
COMMIT;
