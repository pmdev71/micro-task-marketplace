import { sendReviewNotification } from '../services/notifications/send';
import {
  getPendingSubmissions,
  autoApproveSubmission,
  releaseRewards,
  Submission,
} from '../services/submissions';
import { logAuditAction } from '../services/audit';

const HOUR = 60 * 60 * 1000;
const REMINDER_THRESHOLD = 72; // hours
const AUTO_APPROVE_THRESHOLD = 96; // hours

async function processSubmission(submission: Submission, now: Date): Promise<void> {
  const ageHours = (now.getTime() - submission.submittedAt.getTime()) / HOUR;

  if (ageHours >= AUTO_APPROVE_THRESHOLD) {
    await autoApproveSubmission(submission.id);
    await releaseRewards(submission.id);
    await logAuditAction({
      submissionId: submission.id,
      action: 'auto-approved after reviewer timeout',
    });
  } else if (ageHours >= REMINDER_THRESHOLD) {
    await sendReviewNotification(submission.reviewerId, submission.id);
  }
}

export async function checkPendingSubmissions(): Promise<void> {
  const submissions = await getPendingSubmissions();
  const now = new Date();
  for (const submission of submissions) {
    await processSubmission(submission, now);
  }
}

// Run the check every hour.
setInterval(() => {
  checkPendingSubmissions().catch((err) =>
    console.error('taskExpiration job failed', err)
  );
}, HOUR);
