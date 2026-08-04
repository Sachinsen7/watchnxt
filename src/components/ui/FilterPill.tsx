import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface FilterPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <Button
      size="sm"
      radius="full"
      onPress={onClick}
      variant={active ? "solid" : "flat"}
      className={cn(
        "px-4 font-medium transition-colors",
        active
          ? "bg-[#EEDBFF] text-canvas"
          : "bg-surface text-text-secondary hover:bg-surface-raised hover:text-text-primary",
      )}
    >
      {label}
    </Button>
  );
}
