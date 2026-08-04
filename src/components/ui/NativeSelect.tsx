import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface NativeSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  "aria-label"?: string;
  className?: string;
}

/**
 * Plain native <select>, styled to match the design system — HeroUI's Select has repeatedly
 * rendered near-invisible or with broken internals in this app (Input, Switch had the same
 * issue). A native element sidesteps all of that with guaranteed-correct browser behavior.
 */
export function NativeSelect({ value, onChange, options, className, ...props }: NativeSelectProps) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={props["aria-label"]}
        className="h-12 w-full appearance-none rounded-md bg-surface-raised px-4 pr-10 text-sm text-text-primary outline-none focus-visible:shadow-[0_0_0_2px_rgb(var(--accent-secondary))]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-surface-raised text-text-primary">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
    </div>
  );
}
