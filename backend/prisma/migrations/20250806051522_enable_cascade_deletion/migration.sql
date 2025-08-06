-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_blockId_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_topicId_fkey";

-- DropForeignKey
ALTER TABLE "FeedbackMessage" DROP CONSTRAINT "FeedbackMessage_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "TaskSubmission" DROP CONSTRAINT "TaskSubmission_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TestSubmission" DROP CONSTRAINT "TestSubmission_taskId_fkey";

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskSubmission" ADD CONSTRAINT "TaskSubmission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Block"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackMessage" ADD CONSTRAINT "FeedbackMessage_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "TaskSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "TaskSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestSubmission" ADD CONSTRAINT "TestSubmission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Block"("id") ON DELETE CASCADE ON UPDATE CASCADE;
