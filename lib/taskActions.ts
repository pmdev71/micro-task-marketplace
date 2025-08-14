import { logActivity } from "@/lib/activityLogs";

export async function bookTask(userId: string, taskId: string, details?: string) {
  await logActivity({ userId, taskId, action: "booking", details });
}

export async function submitTask(userId: string, taskId: string, details?: string) {
  await logActivity({ userId, taskId, action: "submission", details });
}

export async function approveTask(userId: string, taskId: string, details?: string) {
  await logActivity({ userId, taskId, action: "approval", details });
}

export async function rejectTask(userId: string, taskId: string, details?: string) {
  await logActivity({ userId, taskId, action: "rejection", details });
}

export async function autoApproveTask(userId: string, taskId: string, details?: string) {
  await logActivity({ userId, taskId, action: "auto-approval", details });
}
