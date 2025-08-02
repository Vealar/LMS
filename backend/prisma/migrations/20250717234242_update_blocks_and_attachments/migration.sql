/*
  Warnings:

  - The values [ASSIGNMENT] on the enum `BlockType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BlockType_new" AS ENUM ('THEORY', 'TASK', 'TEST', 'FILE');
ALTER TABLE "Block" ALTER COLUMN "type" TYPE "BlockType_new" USING ("type"::text::"BlockType_new");
ALTER TYPE "BlockType" RENAME TO "BlockType_old";
ALTER TYPE "BlockType_new" RENAME TO "BlockType";
DROP TYPE "BlockType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Block" ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "Attachment" (
    "id" SERIAL NOT NULL,
    "blockId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
