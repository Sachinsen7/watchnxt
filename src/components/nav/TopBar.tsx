import { Input, Avatar } from "@heroui/react";
import { Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { Badge } from "@/components/ui/Badge";

interface TopBarProps {
  searchPlaceholder?: string;
}

/** Shared header across every inner page — search, notifications, profile. Matches the reference screens 1:1. */
export function TopBar({ searchPlaceholder = "Search matches, players..." }: TopBarProps) {
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const [query, setQuery] = useState("");

  function handleSearch(e: React.KeyboardEvent) {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div className="flex items-center gap-4 py-2">
      <Input
        placeholder={searchPlaceholder}
        value={query}
        onValueChange={setQuery}
        onKeyDown={handleSearch}
        startContent={<Search className="h-4 w-4 text-text-tertiary" />}
        radius="full"
        classNames={{
          base: "max-w-xl",
          inputWrapper: "bg-surface data-[hover=true]:bg-surface-raised transition-colors",
          innerWrapper: "gap-2.5",
          input: "bg-transparent appearance-none text-sm text-text-primary placeholder:text-text-tertiary",
        }}
      />

      <div className="flex-1" />

      <button
        onClick={() => navigate("/notifications")}
        className="relative shrink-0 rounded-full p-2 text-text-secondary hover:text-text-primary"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-live" />
      </button>

      <button
        onClick={() => navigate("/profile")}
        className="flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-3 hover:bg-surface-raised"
      >
        <Avatar size="sm" className="shrink-0" src="https://picsum.photos/seed/avatar/80/80" />
        <span className="hidden text-sm font-semibold text-text-primary md:inline">
          {user?.name ?? "Alex Morgan"}
        </span>
        <Badge kind="premium" className="hidden md:inline-flex">
          {user?.tier === "Free" ? "Free" : "Premium"}
        </Badge>
      </button>
    </div>
  );
}
