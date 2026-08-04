import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  "aria-label"?: string;
}

/** Plain custom switch — HeroUI's Switch has repeatedly rendered with a broken thumb icon in this app. */
export function Toggle({ checked, onChange, "aria-label": ariaLabel }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
        checked ? "bg-gradient-cta" : "bg-white/10",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}
