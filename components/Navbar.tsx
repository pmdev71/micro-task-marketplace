'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <Link href="/" className="font-bold text-xl">MicroTask</Link>
      <div className="flex gap-4">
        <Link href="/login" className="hover:text-blue-500 transition">Login</Link>
        <Link href="/register" className="hover:text-blue-500 transition">Register</Link>
        <Link href="/dashboard" className="hover:text-blue-500 transition">Dashboard</Link>
      </div>
    </nav>
  );
}
