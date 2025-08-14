import SubAdminSidebar from "@/components/sidebar/SubAdminSidebar";

export default function SubAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SubAdminSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
