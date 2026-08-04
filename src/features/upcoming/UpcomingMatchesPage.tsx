import { RevealSection } from "@/components/rails/RevealSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { FilterPill } from "@/components/ui/FilterPill";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { CardBase } from "@/components/cards/CardBase";
import { Rail } from "@/components/rails/Rail";
import { useGetUpcomingMatchesQuery } from "@/store/api/contentApi";

const quickFilters = ["Today", "Tomorrow", "This Weekend", "Live Soon", "Cricket", "Football", "Formula 1", "Kabaddi"];

const bigMatches = [
  { sport: "Formula 1", title: "Monaco Grand Prix", meta: "26 May • Practice 1", cta: "Remind me", thumb: "big-1" },
  { sport: "ATP Tour", title: "Italian Open Finals", meta: "19 May • Live from Rome", cta: "Watch Promo", thumb: "big-2" },
  { sport: "ATP Tour", title: "Italian Open Finals", meta: "19 May • Live from Rome", cta: "Watch Promo", thumb: "big-3" },
];

export function UpcomingMatchesPage() {
  const { data: matches = [] } = useGetUpcomingMatchesQuery();
  const [quickFilter, setQuickFilter] = useState("Today");
  const hero = matches[0];

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-6 md:px-10">
        <h1 className="font-display text-2xl font-bold text-text-primary">Upcoming Matches</h1>
        <p className="mt-1 max-w-2xl text-sm text-text-secondary">
          Browse all scheduled live sports events and set reminders so you never miss the action.
        </p>
      </div>

      {hero && (
        <div className="px-6 pt-6 md:px-10">
          <div className="relative overflow-hidden rounded-lg">
            <img src={hero.thumbnail} alt={hero.title} className="h-[380px] w-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="flex items-center gap-2">
                <Badge kind="sport">{hero.league}</Badge>
                <Badge kind="neutral">Matchweek 32</Badge>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="text-center">
                      <div className="mx-auto mb-1 h-12 w-12 rounded-full bg-white/10 backdrop-blur" />
                      <p className="text-sm font-bold text-text-primary">{hero.teams[0].name}</p>
                    </div>
                    <span className="font-display text-lg font-bold text-text-tertiary">VS</span>
                    <div className="text-center">
                      <div className="mx-auto mb-1 h-12 w-12 rounded-full bg-white/10 backdrop-blur" />
                      <p className="text-sm font-bold text-text-primary">{hero.teams[1].name}</p>
                    </div>
                  </div>
                  <h2 className="font-display text-3xl font-extrabold text-text-primary">{hero.title}</h2>
                  <p className="mt-1 text-sm text-text-secondary">{hero.venue}</p>
                  <div className="mt-4 flex gap-3">
                    <Button
                      variant="flat"
                      radius="full"
                      className="bg-premium px-6 text-canvas shadow-[0_4px_20px_rgba(245,185,61,0.35)] hover:brightness-110"
                      startContent={<Bell className="h-4 w-4" />}
                    >
                      Set Reminder
                    </Button>
                    <Link to={`/upcoming/${hero.id}`}>
                      <Button variant="flat" radius="full" className="bg-white/10 px-6 text-text-primary">
                        View Match Details
                      </Button>
                    </Link>
                  </div>
                </div>
                <CountdownTimer target={hero.startsAt} size="lg" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-6 mt-6 flex flex-col gap-4 rounded-lg border border-white/10 bg-surface/60 p-4 md:mx-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <FilterSelect label="All Sports" value="All Sports" />
            <FilterSelect label="League" value="All Leagues" />
            <FilterSelect label="Match Status" value="Any Status" />
          </div>
          <FilterSelect label="Sort by" value="Upcoming First" />
        </div>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((f) => (
            <FilterPill key={f} label={f} active={quickFilter === f} onClick={() => setQuickFilter(f)} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-14 px-6 py-10 md:px-10">
        <RevealSection>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-text-primary">Matches For You</h2>
            <Link to="#" className="text-sm font-medium text-tertiary">
              View Calendar &gt;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {matches.map((m) => (
              <CardBase key={m.id}>
                <div className="relative aspect-video w-full overflow-hidden">
                  <img src={m.thumbnail} alt={m.title} className="h-full w-full object-cover" />
                  <div className="absolute left-2 top-2">
                    <Badge kind="sport">{m.league}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm font-bold text-text-primary">
                    <span>{m.teams[0].name}</span>
                    <span className="text-xs font-medium text-text-tertiary">vs</span>
                    <span>{m.teams[1].name}</span>
                  </div>
                  <p className="mt-2 text-xs text-text-tertiary">
                    {new Date(m.startsAt).toLocaleDateString(undefined, { weekday: "long" })},{" "}
                    {new Date(m.startsAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  {m.venue && <p className="text-xs text-text-tertiary">{m.venue}</p>}
                  <Link to={`/upcoming/${m.id}`}>
                    <Button
                      variant="flat"
                      radius="full"
                      className="mt-3 w-full bg-premium text-canvas shadow-[0_4px_20px_rgba(245,185,61,0.35)] hover:brightness-110"
                      startContent={<Bell className="h-4 w-4" />}
                    >
                      Set Reminder
                    </Button>
                  </Link>
                </div>
              </CardBase>
            ))}
          </div>
        </RevealSection>

        <Rail title="This Week's Big Matches" itemClassName="w-[340px]" alwaysShowArrows>
          {bigMatches.map((m, i) => (
            <CardBase key={i}>
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${m.thumb}/700/400`}
                  alt={m.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute left-3 top-3 text-[11px] font-bold uppercase tracking-wide text-secondary">
                  {m.sport}
                </div>
                <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-lg font-bold text-text-primary">{m.title}</p>
                    <p className="text-xs text-text-tertiary">{m.meta}</p>
                  </div>
                  <Button variant="flat" size="sm" radius="full" className="shrink-0 bg-white/10 text-text-primary">
                    {m.cta}
                  </Button>
                </div>
              </div>
            </CardBase>
          ))}
        </Rail>
      </div>

      <Footer />
    </div>
  );
}
