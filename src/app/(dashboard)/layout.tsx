import DashboardAside from "./_components/DashboardAside";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex min-h-screen items-center gap-x-32">
      <DashboardAside />
      {/* Main Content */}
      <div>{children}</div>
    </div>
  );
}
