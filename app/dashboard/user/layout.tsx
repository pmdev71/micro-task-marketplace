import UserSidebar from "@/components/sidebar/UserSidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <UserSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
