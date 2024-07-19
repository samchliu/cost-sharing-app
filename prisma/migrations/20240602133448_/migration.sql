/*
  Warnings:

  - You are about to drop the `AdvancePayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Expend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdvancePayer" DROP CONSTRAINT "AdvancePayer_expendId_fkey";

-- DropForeignKey
ALTER TABLE "AdvancePayer" DROP CONSTRAINT "AdvancePayer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Expend" DROP CONSTRAINT "Expend_createById_fkey";

-- DropForeignKey
ALTER TABLE "Expend" DROP CONSTRAINT "Expend_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Payer" DROP CONSTRAINT "Payer_expendId_fkey";

-- DropForeignKey
ALTER TABLE "Payer" DROP CONSTRAINT "Payer_userId_fkey";

-- DropTable
DROP TABLE "AdvancePayer";

-- DropTable
DROP TABLE "Expend";

-- DropTable
DROP TABLE "Payer";

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createById" TEXT NOT NULL,
    "payerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sharer" (
    "expenseId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sharer_pkey" PRIMARY KEY ("expenseId","userId")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sharer" ADD CONSTRAINT "Sharer_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sharer" ADD CONSTRAINT "Sharer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
