export interface ProofQuestion {
  id: string;
  text: string;
  isMandatory: boolean;
}

export interface Task {
  id: string;
  title: string;
  /**
   * Up to five questions that the worker must answer as proof of work.
   */
  proofQuestions: ProofQuestion[];
}

/**
 * Selects proof questions for a booking. All mandatory questions are
 * included and, if available, one random optional question.
 */
export function selectProofQuestions(task: Task): ProofQuestion[] {
  if (task.proofQuestions.length > 5) {
    throw new Error("A task can have at most five proof questions");
  }

  const mandatory = task.proofQuestions.filter((q) => q.isMandatory);
  const optional = task.proofQuestions.filter((q) => !q.isMandatory);

  const selected = [...mandatory];
  if (optional.length > 0) {
    const random = optional[Math.floor(Math.random() * optional.length)];
    selected.push(random);
  }

  return selected;
}
