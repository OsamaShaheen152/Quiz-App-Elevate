import React from "react";
import SettingsAsideNav from "./_components/settings-aside-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 flex min-h-[calc(100vh-200px)] gap-6 xl:mt-6">
      <SettingsAsideNav />
      <div className="w-full -translate-x-3 xl:px-6">{children}</div>
    </div>
  );
}
