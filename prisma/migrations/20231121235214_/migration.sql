-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_session_id_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `session_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
