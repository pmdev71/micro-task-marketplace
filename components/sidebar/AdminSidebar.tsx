import Link from "next/link";

const AdminSidebar = () => (
  <aside className="w-64 min-h-screen bg-gray-100 p-4">
    <nav>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard/admin">Overview</Link>
        </li>
        <li>
          <Link href="/dashboard/admin/users">Manage Users</Link>
        </li>
        <li>
          <Link href="/dashboard/admin/tasks">Manage Tasks</Link>
        </li>
        <li>
          <Link href="/dashboard/admin/reports">Reports</Link>
        </li>
        <li>
          <Link href="/dashboard/admin/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default AdminSidebar;
