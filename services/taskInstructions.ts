export interface TaskInstruction {
  taskId: string;
  instructionText: string;
  isAssigned: boolean;
  assignedTo: string | null;
  expiresAt: Date | null;
}

export const taskInstructions: TaskInstruction[] = [];
