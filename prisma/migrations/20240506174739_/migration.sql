/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Group` table. All the data in the column will be lost.
  - Added the required column `createById` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_ownerId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "ownerId",
ADD COLUMN     "createById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
