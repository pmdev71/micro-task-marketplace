export interface ScreenshotRequirements {
  /**
   * Number of screenshots required to complete the task (0-2).
   */
  count: 0 | 1 | 2;
  /** Description of what the screenshots should demonstrate. */
  description: string;
}

export interface Task {
  // Additional task fields could go here such as id, title, description, etc.
  screenshotRequirements: ScreenshotRequirements;
}
