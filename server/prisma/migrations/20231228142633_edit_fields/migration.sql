/*
  Warnings:

  - You are about to drop the column `updated_ap` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `updated_ap` on the `post` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `updated_ap`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `updated_ap`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
