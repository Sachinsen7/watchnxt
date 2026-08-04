import { Outlet } from "react-router-dom";
import { SidebarRail } from "@/components/nav/SidebarRail";
import { MobileTabBar } from "@/components/nav/MobileTabBar";

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <SidebarRail />
      <main className="min-w-0 flex-1 pb-20 md:pb-0 md:pl-[72px]">
        <Outlet />
      </main>
      <MobileTabBar />
    </div>
  );
}
