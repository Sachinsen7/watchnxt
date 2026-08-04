import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { CardBase } from "./CardBase";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types/content";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <CardBase
      className={cn(
        "flex w-full flex-col",
        plan.highlight && "border-secondary/40 shadow-glow-violet md:-translate-y-4",
      )}
    >
      {plan.highlight && (
        <div className="flex items-center justify-center gap-1.5 bg-gradient-cta py-1.5 text-xs font-bold uppercase tracking-wide text-text-on-accent">
          <SparklesIcon className="h-3.5 w-3.5" /> Best Value
        </div>
      )}
      <div className="relative aspect-[5/3] w-full overflow-hidden">
        <img src={plan.thumbnail} alt={plan.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        {plan.badge && (
          <span className="absolute left-3 top-3 rounded-sm bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white">
            {plan.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-text-primary">{plan.name}</h3>
        <p className="mt-1 flex items-baseline gap-1">
          <span className="font-display text-3xl font-extrabold text-text-primary">{plan.price}</span>
          {plan.period && <span className="text-sm text-text-tertiary">/ {plan.period}</span>}
        </p>
        <p className="mt-2 text-sm text-text-secondary">{plan.description}</p>

        <ul className="mt-4 flex flex-1 flex-col gap-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-secondary" /> {f}
            </li>
          ))}
        </ul>

        <Button
          variant="gradient"
          radius="md"
          className="mt-6 h-14 w-full text-base font-bold shadow-glow-cta rounded-md"
        >
          {plan.cta}
        </Button>
      </div>
    </CardBase>
  );
}
