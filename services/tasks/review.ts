import { taskInstructions } from '../taskInstructions';

/**
 * Validates a participant's submission against the instruction assigned to them.
 * Throws an error if the submission is invalid.
 * @param taskId id of the task being reviewed
 * @param userId id of the participant
 * @param submissionText text submitted by the participant
 */
export function reviewSubmission(
  taskId: string,
  userId: string,
  submissionText: string
): boolean {
  const now = new Date();
  const instruction = taskInstructions.find(
    (inst) =>
      inst.taskId === taskId &&
      inst.assignedTo === userId &&
      inst.expiresAt !== null &&
      inst.expiresAt > now
  );

  if (!instruction) {
    throw new Error('No valid instruction assigned to this participant.');
  }

  if (instruction.instructionText.trim() !== submissionText.trim()) {
    throw new Error('Submission does not match assigned instruction.');
  }

  return true;
}
