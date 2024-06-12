/*
  Warnings:

  - You are about to drop the column `createById` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `createById` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the `ExpenseHistory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_createById_fkey";

-- DropForeignKey
ALTER TABLE "ExpenseHistory" DROP CONSTRAINT "ExpenseHistory_editById_fkey";

-- DropForeignKey
ALTER TABLE "ExpenseHistory" DROP CONSTRAINT "ExpenseHistory_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_createById_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "createById",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "createById",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ExpenseHistory";

-- CreateTable
CREATE TABLE "History" (
    "expenseId" INTEGER NOT NULL,
    "editorId" TEXT NOT NULL,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("expenseId","editorId")
);

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
