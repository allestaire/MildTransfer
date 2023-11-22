/*
  Warnings:

  - You are about to drop the column `user_id` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `session_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_fkey`;

-- AlterTable
ALTER TABLE `sessions` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `session_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
