import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatBoxProps {
  icon?: LucideIcon;
  value: string;
  label: string;
  accent?: "primary" | "secondary" | "premium" | "none";
  className?: string;
}

const accentClass: Record<NonNullable<StatBoxProps["accent"]>, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  premium: "text-premium",
  none: "text-text-primary",
};

/** Icon/number/label tile used across League Detail, Profile, Match Detail stat grids. */
export function StatBox({ icon: Icon, value, label, accent = "none", className }: StatBoxProps) {
  return (
    <div className={cn("flex items-center gap-3 rounded-md border border-white/10 bg-surface p-4", className)}>
      {Icon && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-surface-raised">
          <Icon className="h-4 w-4 text-text-secondary" />
        </span>
      )}
      <div>
        <p className={cn("text-xl font-extrabold", accentClass[accent])}>{value}</p>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">{label}</p>
      </div>
    </div>
  );
}
