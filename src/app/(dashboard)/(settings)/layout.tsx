import React from "react";
import SettingsAsideNav from "./_components/settings-aside-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex min-h-screen gap-6">
      <SettingsAsideNav />
      <div className="w-full bg-white px-6">{children}</div>
    </div>
  );
}
