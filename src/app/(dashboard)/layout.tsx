import Breadcrumb from "./_components/breadcrumb";
import DashboardAside from "./_components/dashboard-aside";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardAside />

      {/* Main Content */}
      <div className="w-[990px] translate-x-96">
        <Breadcrumb />

        <main>{children}</main>
      </div>
    </div>
  );
}
