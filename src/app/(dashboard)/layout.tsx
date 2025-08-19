import DashboardAside from "./_components/dashboard-aside";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen  ">
      <DashboardAside />
      {/* Main Content */}
      <div className="translate-x-[450px] ">{children}</div>
    </div>
  );
}
