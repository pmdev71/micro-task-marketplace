import Link from "next/link";

const SubAdminSidebar = () => (
  <aside className="w-64 min-h-screen bg-gray-100 p-4">
    <nav>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard/subadmin/tasks">Task Approvals</Link>
        </li>
        <li>
          <Link href="/dashboard/subadmin/kyc">KYC Reviews</Link>
        </li>
        <li>
          <Link href="/dashboard/subadmin/withdrawals">Withdrawal Reviews</Link>
        </li>
        <li>
          <Link href="/dashboard/subadmin/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default SubAdminSidebar;
