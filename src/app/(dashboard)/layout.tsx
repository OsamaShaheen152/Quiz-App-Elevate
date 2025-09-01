import Breadcrumb from "./_components/breadcrumb";
import DashboardAside from "./_components/dashboard-aside";
import TopBar from "./_components/top-bar";

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
        <TopBar />

        <main>{children}</main>
      </div>
    </div>
  );
}
