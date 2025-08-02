/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Attachment` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('NOT_SUBMITTED', 'PENDING', 'GRADED');

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_blockId_fkey";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "createdAt",
DROP COLUMN "name",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "fileSize" INTEGER,
ADD COLUMN     "mimeType" TEXT,
ADD COLUMN     "submissionId" INTEGER,
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "blockId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "TaskSubmission" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "answer" TEXT,
    "grade" DOUBLE PRECISION,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'NOT_SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackMessage" (
    "id" SERIAL NOT NULL,
    "submissionId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedbackMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskSubmission" ADD CONSTRAINT "TaskSubmission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Block"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskSubmission" ADD CONSTRAINT "TaskSubmission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackMessage" ADD CONSTRAINT "FeedbackMessage_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "TaskSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackMessage" ADD CONSTRAINT "FeedbackMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "TaskSubmission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
