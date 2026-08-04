import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "@heroui/react";
import { Button } from "@/components/ui/Button";
import {
  Home,
  PlayCircle,
  CalendarDays,
  Trophy,
  Clapperboard,
  BarChart3,
  Tv,
  LayoutGrid,
  Users,
  Award,
  Search,
  ListVideo,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/ui.slice";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

interface NavItem {
  label: string;
  to: string;
  icon: typeof Home;
  badgeDot?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", to: "/", icon: Home },
  { label: "Live", to: "/live", icon: PlayCircle, badgeDot: true },
  { label: "Upcoming", to: "/upcoming", icon: CalendarDays },
  { label: "Popular Leagues", to: "/leagues", icon: Trophy },
  { label: "Shorts", to: "/shorts", icon: Clapperboard },
  { label: "Highlights", to: "/highlights", icon: BarChart3 },
  { label: "Shows", to: "/shows", icon: Tv },
  { label: "Categories", to: "/categories", icon: LayoutGrid },
  { label: "Player Stories", to: "/player-stories", icon: Users },
  { label: "Premium", to: "/premium", icon: Award },
  { label: "Search", to: "/search", icon: Search },
  { label: "My List", to: "/my-list", icon: ListVideo },
  { label: "Support", to: "/support", icon: HelpCircle },
];

function NavGroup({ items, collapsed }: { items: NavItem[]; collapsed: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <Tooltip
          key={item.to}
          content={item.label}
          placement="right"
          isDisabled={!collapsed}
          delay={150}
          closeDelay={0}
          classNames={{ content: "bg-surface-raised text-text-primary text-xs font-medium px-3 py-1.5 shadow-glow-card" }}
        >
          <NavLink
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-text-tertiary transition-all",
                "hover:scale-[1.03] hover:bg-white/10 hover:text-text-primary",
                isActive && "bg-white/10 text-text-primary",
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-bar"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute inset-y-2 left-0 w-[3px] rounded-r bg-primary"
                  />
                )}
                <span className="relative shrink-0">
                  <item.icon className="h-5 w-5" />
                  {item.badgeDot && (
                    <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-live" />
                  )}
                </span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </>
            )}
          </NavLink>
        </Tooltip>
      ))}
    </div>
  );
}

export function SidebarRail() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pinned = useAppSelector((s) => s.ui.sidebarCollapsed);
  const [hovering, setHovering] = useState(false);

  // Pinned-collapsed sidebar still previews expanded on hover, like Hotstar/Netflix; a manually
  // pinned-open sidebar (pinned=false) just stays open regardless of hover.
  const collapsed = pinned && !hovering;

  return (
    <motion.aside
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      animate={{
        width: collapsed ? 72 : 240,
        boxShadow: collapsed ? "0 0 0 rgba(0,0,0,0)" : "12px 0 40px rgba(0,0,0,0.45)",
      }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 z-30 hidden h-screen flex-col justify-between overflow-hidden overflow-y-auto bg-black/40 px-2 py-6 backdrop-blur-xl md:flex"
    >
      <div className="flex flex-col gap-1">
        <div className={cn("mb-4 flex items-center px-2", collapsed ? "justify-center" : "justify-start")}>
          <Logo compact={collapsed} />
        </div>

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden px-2 pb-3"
            >
              <Button variant="gradient" className="w-full" onPress={() => navigate("/premium")}>
                Subscribe
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <NavGroup items={navItems} collapsed={collapsed} />
      </div>

      <div className="flex flex-col gap-1">
        <Tooltip
          content="Settings"
          placement="right"
          isDisabled={!collapsed}
          delay={150}
          closeDelay={0}
          classNames={{ content: "bg-surface-raised text-text-primary text-xs font-medium px-3 py-1.5 shadow-glow-card" }}
        >
          <NavLink
            to="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-text-tertiary transition-all hover:scale-[1.03] hover:bg-white/10 hover:text-text-primary"
          >
            <Settings className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </NavLink>
        </Tooltip>

        <Tooltip
          content={pinned ? "Pin sidebar open" : "Unpin sidebar"}
          placement="right"
          isDisabled={!collapsed}
          delay={150}
          closeDelay={0}
          classNames={{ content: "bg-surface-raised text-text-primary text-xs font-medium px-3 py-1.5 shadow-glow-card" }}
        >
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="mt-2 flex items-center gap-3 rounded-md bg-white/5 px-3 py-2.5 text-sm font-medium text-text-secondary transition-all hover:scale-[1.03] hover:bg-white/10 hover:text-text-primary"
          >
            {pinned ? <ChevronRight className="h-5 w-5 shrink-0" /> : <ChevronLeft className="h-5 w-5 shrink-0" />}
            {!collapsed && <span>{pinned ? "Pin Open" : "Unpin"}</span>}
          </button>
        </Tooltip>

        <NavLink
          to="/profile"
          className={cn(
            "mt-2 flex items-center gap-3 rounded-md bg-white/5 px-3 py-2.5 hover:bg-white/10",
            collapsed && "justify-center px-0",
          )}
        >
          <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-brand" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">Profile</p>
              <p className="truncate text-xs text-text-tertiary">Pro Member</p>
            </div>
          )}
        </NavLink>
      </div>
    </motion.aside>
  );
}
