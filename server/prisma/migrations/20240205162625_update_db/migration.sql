/*
  Warnings:

  - You are about to drop the column `username` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `post` table. All the data in the column will be lost.
  - Added the required column `profile_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_username_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_username_fkey`;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `username`,
    ADD COLUMN `profile_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `username`,
    ADD COLUMN `profile_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
