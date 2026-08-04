import { Chip } from "@heroui/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type BadgeKind =
  | "live"
  | "premium"
  | "free"
  | "hd"
  | "4k"
  | "multi-lang"
  | "sport"
  | "neutral";

const kindStyles: Record<BadgeKind, string> = {
  live: "bg-live text-white",
  premium: "bg-premium text-text-on-accent",
  free: "bg-free/90 text-white",
  hd: "bg-surface-raised/90 text-text-secondary",
  "4k": "bg-surface-raised/90 text-text-secondary",
  "multi-lang": "bg-surface-raised/90 text-text-secondary",
  sport: "bg-surface-raised/90 text-text-secondary",
  neutral: "bg-surface-raised/90 text-text-secondary",
};

interface BadgeProps {
  kind?: BadgeKind;
  children: ReactNode;
  className?: string;
}

/** LIVE ships its own infinite pulse dot per DESIGN_SYSTEM.md §6.3 — never reuse `--live-red` for anything else. */
export function Badge({ kind = "neutral", children, className }: BadgeProps) {
  return (
    <Chip
      size="sm"
      radius="sm"
      startContent={kind === "live" ? <LiveDot /> : undefined}
      className={cn(
        "gap-1 px-2 text-[11px] font-bold uppercase tracking-wide",
        kindStyles[kind],
        className,
      )}
    >
      {children}
    </Chip>
  );
}

export function LiveDot() {
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-live-ping rounded-full bg-white opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
    </span>
  );
}
