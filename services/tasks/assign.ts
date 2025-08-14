import type { ITask } from '../../models/Task';

export interface Participant {
  device: string;
  region: string;
  country: string;
}

export function canAssign(task: ITask, participant: Participant): boolean {
  if (
    task.allowedDevices.length > 0 &&
    !task.allowedDevices.includes(participant.device)
  ) {
    return false;
  }

  if (
    task.allowedRegions.length > 0 &&
    !task.allowedRegions.includes(participant.region)
  ) {
    return false;
  }

  if (task.excludedCountries.includes(participant.country)) {
    return false;
  }

  return true;
}
