import Link from "next/link";

const UserSidebar = () => (
  <aside className="w-64 min-h-screen bg-gray-100 p-4">
    <nav>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard/user/tasks">Task List</Link>
        </li>
        <li>
          <Link href="/dashboard/user/history">Task History</Link>
        </li>
        <li>
          <Link href="/dashboard/user/kyc">KYC Verification</Link>
        </li>
        <li>
          <Link href="/dashboard/user/post-task">Post Task</Link>
        </li>
        <li>
          <Link href="/dashboard/user/add-balance">Add Balance</Link>
        </li>
        <li>
          <Link href="/dashboard/user/withdraw">Withdraw</Link>
        </li>
        <li>
          <Link href="/dashboard/user/transactions">Transaction History</Link>
        </li>
        <li>
          <Link href="/dashboard/user/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default UserSidebar;
