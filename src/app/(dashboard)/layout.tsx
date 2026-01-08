// import Breadcrumb from "./_components/breadcrumb";
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
      <div className="w-full px-2">
        {/* <Breadcrumb /> */}
        <TopBar />

        <main>{children}</main>
      </div>
    </div>
  );
}
