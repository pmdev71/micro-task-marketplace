import Link from 'next/link';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-4 animate-fade">
      <h1 className="text-4xl font-bold">Welcome to MicroTask Marketplace</h1>
      <p className="max-w-xl">Earn and manage micro tasks with ease. Join us to start working on tasks today.</p>
      <div className="flex gap-4">
        <Link href="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Get Started</Link>
        <Link href="/dashboard" className="border px-4 py-2 rounded hover:bg-gray-100 transition">Dashboard</Link>
      </div>
    </section>
  );
}
