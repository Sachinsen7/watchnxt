import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  className?: string;
}

/** Plain custom checkbox — HeroUI's Checkbox has rendered oversized/misaligned in this app. */
export function Checkbox({ checked, onChange, children, className }: CheckboxProps) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-2.5", className)}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded transition-colors",
          checked ? "bg-gradient-cta" : "bg-white/10",
        )}
      >
        {checked && <Check className="h-3 w-3 text-text-on-accent" strokeWidth={3} />}
      </button>
      <span className="text-xs leading-relaxed text-text-tertiary">{children}</span>
    </label>
  );
}
