import { taskInstructions, TaskInstruction } from '../taskInstructions';

/**
 * Assigns an available instruction for the given task to a user.
 * The assignment marks the instruction as used and sets an expiry based on the booking window.
 * @param taskId id of the task being booked
 * @param userId id of the participant booking the task
 * @param bookingWindowMs duration in milliseconds for how long the instruction is reserved
 * @returns the assigned instruction or null if none are available
 */
export function bookTask(
  taskId: string,
  userId: string,
  bookingWindowMs: number
): TaskInstruction | null {
  const now = new Date();

  // find first instruction that is not currently assigned or has expired
  const instruction = taskInstructions.find((inst) =>
    inst.taskId === taskId &&
    (!inst.isAssigned || (inst.expiresAt !== null && inst.expiresAt <= now))
  );

  if (!instruction) {
    return null;
  }

  instruction.isAssigned = true;
  instruction.assignedTo = userId;
  instruction.expiresAt = new Date(now.getTime() + bookingWindowMs);

  return instruction;
}
