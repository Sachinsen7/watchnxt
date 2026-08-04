import { NavLink } from "react-router-dom";
import { Home, PlayCircle, Search, ListVideo, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", to: "/", icon: Home },
  { label: "Live", to: "/live", icon: PlayCircle },
  { label: "Search", to: "/search", icon: Search },
  { label: "My List", to: "/my-list", icon: ListVideo },
  { label: "Profile", to: "/settings", icon: User },
];

/** Sidebar collapses into this below md, per DESIGN_SYSTEM.md §12. */
export function MobileTabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around bg-sidebar/95 py-2 backdrop-blur md:hidden">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medium text-text-tertiary",
              isActive && "text-primary",
            )
          }
        >
          <tab.icon className="h-5 w-5" />
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
