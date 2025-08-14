import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "activity_logs.json");

export type ActivityLog = {
  timestamp: number;
  userId: string;
  taskId: string;
  action: string;
  details?: string;
};

async function readLogs(): Promise<ActivityLog[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as ActivityLog[];
  } catch {
    return [];
  }
}

async function writeLogs(logs: ActivityLog[]) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(logs, null, 2));
}

export async function logActivity(entry: Omit<ActivityLog, "timestamp"> & { timestamp?: number }) {
  const logs = await readLogs();
  logs.push({ timestamp: entry.timestamp ?? Date.now(), ...entry });
  await writeLogs(logs);
}

export async function getActivityLogs(filter: { userId?: string; taskId?: string } = {}) {
  const logs = await readLogs();
  return logs.filter(
    (log) =>
      (!filter.userId || log.userId === filter.userId) &&
      (!filter.taskId || log.taskId === filter.taskId)
  );
}
