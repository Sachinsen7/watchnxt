import { ChevronDown } from "lucide-react";

interface FilterSelectProps {
  label: string;
  value: string;
}

/**
 * A dropdown-styled button, not an actual HeroUI Select — kept deliberately plain because
 * HeroUI's Select label/value slots have repeatedly rendered overlapping/cramped in this app
 * (see DESIGN_SYSTEM notes). None of these filter bars are wired to real filtering logic yet,
 * so a static, guaranteed-correct-looking trigger is safer than fighting the component internals.
 */
export function FilterSelect({ label, value }: FilterSelectProps) {
  return (
    <button className="flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-white/10 bg-surface px-4 text-sm text-text-secondary transition-colors hover:bg-surface-raised">
      <span className="text-text-tertiary">{label}:</span>
      <span className="font-semibold text-text-primary">{value}</span>
      <ChevronDown className="h-4 w-4 shrink-0 text-text-tertiary" />
    </button>
  );
}
