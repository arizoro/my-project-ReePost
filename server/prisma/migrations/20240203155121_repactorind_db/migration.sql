/*
  Warnings:

  - You are about to drop the column `profile_id` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_profile_id_fkey`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `profile_id`;
