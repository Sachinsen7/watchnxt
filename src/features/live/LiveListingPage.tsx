import { useMemo, useState } from "react";
import { CalendarClock, Bell, ChevronRight, ChevronDown, Plus } from "lucide-react";
import { FaFutbol, FaBaseballBatBall, FaTableTennisPaddleBall, FaFlagCheckered } from "react-icons/fa6";
import { HeroBanner } from "@/components/cards/HeroBanner";
import { LiveMatchCard } from "@/components/cards/LiveMatchCard";
import { FilterPill } from "@/components/ui/FilterPill";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Badge } from "@/components/ui/Badge";
import { useGetHeroMatchQuery, useGetLiveMatchesQuery } from "@/store/api/contentApi";
import { img } from "@/mocks/sports";
import type { SportId } from "@/types/content";

const sportFilters: { label: string; value: SportId | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Cricket", value: "cricket" },
  { label: "Football", value: "football" },
  { label: "Formula 1", value: "f1" },
  { label: "Kabaddi", value: "kabaddi" },
  { label: "Tennis", value: "tennis" },
  { label: "Basketball", value: "basketball" },
];

const schedule = [
  {
    time: "Starting at 8:00 PM",
    title: "Real Madrid vs Barcelona",
    meta: "La Liga • Matchday 15",
    countdown: "Starts in 45m",
    icon: FaFutbol,
    seed: "sched-1",
  },
  {
    time: "Starting at 9:30 PM",
    title: "Mumbai Indians vs RCB",
    meta: "IPL 2024 • Group Stage",
    countdown: "Starts in 2h 15m",
    icon: FaBaseballBatBall,
    seed: "sched-2",
  },
  {
    time: "Starting Now",
    title: "Wimbledon Finals",
    meta: "Centre Court • Finals",
    icon: FaTableTennisPaddleBall,
    seed: "sched-3",
    live: true,
  },
  {
    time: "Starting Now",
    title: "F1 Qualifying: Monza",
    meta: "Italian Grand Prix",
    icon: FaFlagCheckered,
    seed: "sched-4",
    live: true,
  },
];

export function LiveListingPage() {
  const { data: hero } = useGetHeroMatchQuery();
  const { data: liveMatches = [] } = useGetLiveMatchesQuery();
  const [sport, setSport] = useState<SportId | "all">("all");

  const filtered = useMemo(
    () => (sport === "all" ? liveMatches : liveMatches.filter((m) => m.sport === sport)),
    [liveMatches, sport],
  );

  return (
    <div className="min-h-screen">
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-6 md:px-10">
        <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-text-primary">
          <span className="h-2.5 w-2.5 rounded-full bg-live" /> Live Matches
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-text-secondary">
          Watch every live sporting event happening right now from across the globe with
          real-time stats and multi-angle views.
        </p>
      </div>

      <div className="px-6 pt-6 md:px-10">{hero && <HeroBanner match={hero} variant="framed" />}</div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-6 pt-8 md:px-10">
        <div className="flex flex-wrap gap-2">
          {sportFilters.map((f) => (
            <FilterPill key={f.value} label={f.label} active={sport === f.value} onClick={() => setSport(f.value)} />
          ))}
        </div>
        <FilterSelect label="Sort By" value="Live Now" />
      </div>

      <div className="grid grid-cols-1 gap-5 px-6 py-8 sm:grid-cols-2 md:px-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filtered.map((m) => (
          <LiveMatchCard key={m.id} match={m} />
        ))}
      </div>

      <div className="px-6 pb-14 md:px-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-text-primary">
            <CalendarClock className="h-5 w-5 text-secondary" /> Today's Live Schedule
          </h2>
          <button className="flex items-center gap-1 text-sm font-medium text-tertiary">
            View Full Calendar <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {schedule.map((item) => (
            <div key={item.title} className="relative overflow-hidden rounded-md">
              <img
                src={img(item.seed, 500, 300)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-surface/70" />
              <div className="relative p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-text-tertiary">
                    {item.time}
                  </p>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-raised">
                    <item.icon className="h-3.5 w-3.5 text-secondary" />
                  </span>
                </div>
                <p className="mt-2 truncate text-sm font-semibold text-text-primary">{item.title}</p>
                <p className="mt-1 truncate text-xs text-text-tertiary">{item.meta}</p>
                <div className="mt-3 flex items-center justify-between">
                  {item.live ? (
                    <Badge kind="live">Join Now</Badge>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-semibold text-secondary">
                      <Bell className="h-3 w-3" /> Remind Me
                    </span>
                  )}
                  {item.countdown && <span className="text-[11px] text-text-tertiary">{item.countdown}</span>}
                </div>
              </div>
            </div>
          ))}
          <button className="flex flex-col items-center justify-center gap-2 rounded-md bg-surface/60 p-4 text-sm text-text-tertiary hover:bg-surface hover:text-text-primary">
            <Plus className="h-5 w-5" /> Browse More Events
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 rounded-full bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-raised">
            Load More Matches <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
