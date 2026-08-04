import { Link } from "react-router-dom";
import { Lock, ShieldCheck, Zap, CalendarX, Headset, CheckCircle2, Star, Crown, Eye } from "lucide-react";
import { Footer } from "@/components/nav/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn, formatCount } from "@/lib/utils";
import { useGetPricingPlansQuery, useGetHeroMatchQuery } from "@/store/api/contentApi";
import type { PricingPlan } from "@/types/content";

const trust = [
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: Zap, label: "Instant Access" },
  { icon: CalendarX, label: "Cancel Anytime" },
  { icon: Headset, label: "24/7 Support" },
];

type Tier = "match" | "tournament" | "monthly";

const tierStyles: Record<
  Tier,
  {
    card: string;
    ribbon?: string;
    ribbonLabel?: string;
    icon: string;
    featureIcon: typeof Star;
    button: string;
  }
> = {
  match: {
    card: "border-secondary/30",
    icon: "text-secondary",
    featureIcon: CheckCircle2,
    button: "border border-secondary/50 bg-transparent text-secondary hover:bg-secondary/10",
  },
  tournament: {
    card: "border-primary/50 shadow-[0_0_40px_rgba(255,122,26,0.15)]",
    ribbon: "bg-primary",
    ribbonLabel: "Best Value",
    icon: "text-primary-light",
    featureIcon: Star,
    button: "bg-primary text-canvas shadow-glow-cta hover:brightness-110",
  },
  monthly: {
    card: "border-tertiary/50 shadow-[0_0_40px_rgba(236,178,255,0.15)]",
    ribbon: "bg-gradient-to-r from-secondary to-tertiary",
    ribbonLabel: "Most Popular",
    icon: "text-tertiary",
    featureIcon: Crown,
    button: "bg-gradient-to-r from-[#38BDF8] to-[#9333EA] text-white hover:brightness-110",
  },
};

const tierForPlan = (id: string): Tier =>
  id === "p-tournament" ? "tournament" : id === "p-monthly" ? "monthly" : "match";

function PassCard({ plan }: { plan: PricingPlan }) {
  const tier = tierForPlan(plan.id);
  const style = tierStyles[tier];

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-surface p-6",
        style.card,
        tier === "tournament" && "md:-translate-y-3",
      )}
    >
      {style.ribbonLabel && (
        <span
          className={cn(
            "absolute -top-3 right-5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-canvas",
            style.ribbon,
          )}
        >
          {style.ribbonLabel}
        </span>
      )}

      <h3 className="text-lg font-bold text-text-primary">{plan.name}</h3>
      <p className="mt-1 text-sm text-text-secondary">{plan.description}</p>

      <p className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-4xl font-extrabold text-text-primary">{plan.price}</span>
        {plan.period && <span className="text-sm text-text-tertiary">/{plan.period.toLowerCase()}</span>}
      </p>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {plan.features.map((f, i) => {
          const FeatureIcon = i === 0 ? style.featureIcon : CheckCircle2;
          return (
            <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
              <FeatureIcon className={cn("h-4 w-4 shrink-0", style.icon)} /> {f}
            </li>
          );
        })}
      </ul>

      <Link to="/checkout">
        <Button variant="flat" radius="md" className={cn("mt-6 h-12 w-full text-sm font-bold", style.button)}>
          {plan.cta}
        </Button>
      </Link>
    </div>
  );
}

export function PremiumPaywallPage() {
  const { data: plans = [] } = useGetPricingPlansQuery();
  const { data: hero } = useGetHeroMatchQuery();

  return (
    <div>
      <div className="flex flex-col items-center px-6 pt-16 text-center md:px-10">
        <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-raised">
          <Lock className="h-6 w-6 text-secondary" />
        </span>
        <h1 className="font-display text-3xl font-extrabold text-text-primary md:text-4xl">
          Unlock Premium Sports Streaming
        </h1>
        <p className="mt-2 max-w-md text-sm text-text-secondary">
          Choose the perfect plan to continue watching this live event in HD without ads.
        </p>

        {hero && (
          <div className="relative mt-8 flex w-full max-w-xl items-center gap-4 rounded-xl border border-white/10 bg-surface p-4 text-left">
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md">
              <img src={hero.thumbnail} alt={hero.title} className="h-full w-full object-cover" />
              <span className="absolute left-1 top-1">
                <Badge kind="live">Live</Badge>
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-primary-light">{hero.league}</span>
                <Badge kind="4k">Ultra HD Available</Badge>
              </div>
              <p className="truncate font-display text-base font-bold text-text-primary">{hero.title}</p>
              <p className="flex items-center gap-2 text-sm">
                <span className="font-bold text-tertiary">Score: {hero.scoreLine}</span>
                <span className="text-text-tertiary">({hero.scoreSubLine})</span>
                {hero.viewerCount && (
                  <span className="flex items-center gap-1 text-text-tertiary">
                    <Eye className="h-3.5 w-3.5" /> {formatCount(hero.viewerCount)} watching
                  </span>
                )}
              </p>
            </div>
            <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-brand" />
          </div>
        )}
      </div>

      <div className="px-6 py-12 md:px-10">
        <h2 className="mb-6 text-center font-display text-xl font-bold text-text-primary">Choose Your Pass</h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <PassCard key={p.id} plan={p} />
          ))}
        </div>

        <div className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-x-12 gap-y-6 border-t border-white/5 pt-10">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-xs text-text-tertiary">
              <Icon className="h-5 w-5 text-secondary" />
              {label}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-sm">
          <button className="font-semibold text-tertiary">Already Purchased? Restore Purchase</button>
          <Link to="/" className="text-text-tertiary underline">
            Maybe Later
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
