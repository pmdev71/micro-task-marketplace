import { getActivityLogs } from "@/lib/activityLogs";

export const dynamic = "force-dynamic";

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: { user?: string; task?: string };
}) {
  const logs = await getActivityLogs({
    userId: searchParams.user,
    taskId: searchParams.task,
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Activity Logs</h1>
      <form className="flex gap-2 mb-4">
        <input
          type="text"
          name="user"
          placeholder="User ID"
          defaultValue={searchParams.user}
          className="border p-1"
        />
        <input
          type="text"
          name="task"
          placeholder="Task ID"
          defaultValue={searchParams.task}
          className="border p-1"
        />
        <button type="submit" className="border px-2">
          Filter
        </button>
      </form>
      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border p-1">Time</th>
            <th className="border p-1">User</th>
            <th className="border p-1">Task</th>
            <th className="border p-1">Action</th>
            <th className="border p-1">Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td className="border p-1">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="border p-1">{log.userId}</td>
              <td className="border p-1">{log.taskId}</td>
              <td className="border p-1">{log.action}</td>
              <td className="border p-1">{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
