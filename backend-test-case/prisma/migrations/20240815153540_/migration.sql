-- CreateTable
CREATE TABLE `Book` (
    `code` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 10,

    UNIQUE INDEX `Book_code_key`(`code`),
    UNIQUE INDEX `Book_title_key`(`title`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `penaltyExpireDate` DATETIME(3) NULL,

    UNIQUE INDEX `Member_code_key`(`code`),
    UNIQUE INDEX `Member_name_key`(`name`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BorrowedList` (
    `id` VARCHAR(191) NOT NULL,
    `bookCode` VARCHAR(191) NOT NULL,
    `memberCode` VARCHAR(191) NOT NULL,
    `borrowDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `returnDate` DATETIME(3) NULL,
    `returned` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BorrowedList` ADD CONSTRAINT `BorrowedList_bookCode_fkey` FOREIGN KEY (`bookCode`) REFERENCES `Book`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BorrowedList` ADD CONSTRAINT `BorrowedList_memberCode_fkey` FOREIGN KEY (`memberCode`) REFERENCES `Member`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
