/*
  Warnings:

  - You are about to drop the column `category` on the `Expend` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Expend` table. All the data in the column will be lost.
  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `onwerId` on the `Group` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `GroupMembers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AdvancePayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Payer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createById` to the `Expend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expend" DROP CONSTRAINT "Expend_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_onwerId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMembers" DROP CONSTRAINT "GroupMembers_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMembers" DROP CONSTRAINT "GroupMembers_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AdvancePayer" DROP CONSTRAINT "_AdvancePayer_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdvancePayer" DROP CONSTRAINT "_AdvancePayer_B_fkey";

-- DropForeignKey
ALTER TABLE "_Payer" DROP CONSTRAINT "_Payer_A_fkey";

-- DropForeignKey
ALTER TABLE "_Payer" DROP CONSTRAINT "_Payer_B_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Expend" DROP COLUMN "category",
DROP COLUMN "description",
ADD COLUMN     "createById" TEXT NOT NULL,
ALTER COLUMN "groupId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Group" DROP CONSTRAINT "Group_pkey",
DROP COLUMN "onwerId",
ADD COLUMN     "ownerId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Group_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Group_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "image",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "GroupMembers";

-- DropTable
DROP TABLE "_AdvancePayer";

-- DropTable
DROP TABLE "_Payer";

-- CreateTable
CREATE TABLE "GroupUser" (
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GroupUser_pkey" PRIMARY KEY ("groupId","userId")
);

-- CreateTable
CREATE TABLE "AdvancePayer" (
    "expendId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AdvancePayer_pkey" PRIMARY KEY ("expendId","userId")
);

-- CreateTable
CREATE TABLE "Payer" (
    "expendId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Payer_pkey" PRIMARY KEY ("expendId","userId")
);

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupUser" ADD CONSTRAINT "GroupUser_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupUser" ADD CONSTRAINT "GroupUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expend" ADD CONSTRAINT "Expend_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expend" ADD CONSTRAINT "Expend_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvancePayer" ADD CONSTRAINT "AdvancePayer_expendId_fkey" FOREIGN KEY ("expendId") REFERENCES "Expend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvancePayer" ADD CONSTRAINT "AdvancePayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payer" ADD CONSTRAINT "Payer_expendId_fkey" FOREIGN KEY ("expendId") REFERENCES "Expend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payer" ADD CONSTRAINT "Payer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
