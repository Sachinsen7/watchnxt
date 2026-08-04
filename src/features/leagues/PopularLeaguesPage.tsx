import { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, ChevronRight, PlayCircle } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { FilterPill } from "@/components/ui/FilterPill";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CardBase } from "@/components/cards/CardBase";
import { useGetLeaguesQuery } from "@/store/api/contentApi";
import { img } from "@/mocks/sports";

const sportFilters = ["All", "Cricket", "Football", "Formula 1", "Kabaddi", "Tennis", "Basketball", "E-Sports"];

const trending = [
  { rank: 1, title: "Formula 1: 2026 Season", desc: "The era of sustainable racing begins. New engines, new rivalries.", thumb: "trend-1" },
  { rank: 2, title: "ATP World Tour", desc: "Witness the next generation taking over the grass courts.", thumb: "trend-2" },
];

const recentlyViewed = [
  { title: "NBA Playoffs", meta: "Basketball • USA", thumb: "rv-1" },
  { title: "PGA Tour", meta: "Golf • Global", thumb: "rv-2" },
  { title: "UFC Fight Night", meta: "MMA • USA", thumb: "rv-3" },
  { title: "French Open", meta: "Tennis • France", thumb: "rv-4" },
];

export function PopularLeaguesPage() {
  const { data: leagues = [] } = useGetLeaguesQuery();
  const [sport, setSport] = useState("All");
  const hero = leagues[0];

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-6 md:px-10">
        <h1 className="font-display text-2xl font-bold text-text-primary">Explore Leagues</h1>
        <p className="mt-1 text-sm text-text-secondary">Browse every sports league available on WatchNXT.</p>
      </div>

      {hero && (
        <div className="px-6 pt-6 md:px-10">
          <div className="relative overflow-hidden rounded-lg">
            <img src={img("league-hero", 1600, 700)} alt="" className="h-[380px] w-full object-cover" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end gap-3 p-8">
              <div className="flex items-center gap-2">
                <Badge kind="live">Live Now</Badge>
                <span className="text-xs font-bold uppercase tracking-wide text-secondary">
                  {hero.sport} • T20 League
                </span>
              </div>
              <h2 className="font-display text-3xl font-extrabold text-text-primary">IPL 2026: The Galactic Era</h2>
              <p className="max-w-xl text-sm text-text-secondary">
                The world's biggest T20 spectacle returns with more drama, more stars, and unmatched high-fidelity
                coverage only on WatchNXT.
              </p>
              <div className="mt-2 flex gap-3">
                <Button variant="gradient" radius="full" className="px-6">
                  Explore League
                </Button>
                <Button variant="flat" radius="full" className="bg-white/10 px-6 text-text-primary" startContent="+">
                  Follow League
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 px-6 pt-6 md:px-10">
        <FilterSelect label="Sport" value="All" />
        <FilterSelect label="Season" value="2025/26" />
        <FilterSelect label="Country" value="Global" />
        <FilterSelect label="Status" value="Active" />
      </div>

      <div className="flex flex-wrap gap-2 px-6 pt-4 md:px-10">
        {sportFilters.map((f) => (
          <FilterPill key={f} label={f} active={sport === f} onClick={() => setSport(f)} />
        ))}
      </div>

      <div className="flex flex-col gap-14 px-6 py-10 md:px-10">
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-text-primary">Major Leagues</h2>
            <Link to="#" className="text-sm font-medium text-tertiary">
              View All &gt;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leagues.map((l) => (
              <CardBase key={l.id}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img src={l.thumbnail} alt={l.name} className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur">
                    <PlayCircle className="h-4 w-4 text-text-primary" />
                  </span>
                  {l.status === "LIVE" && (
                    <span className="absolute right-3 top-3">
                      <Badge kind="live">Live</Badge>
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-display text-lg font-bold text-text-primary">{l.name}</p>
                  <p className="mt-0.5 text-xs text-text-tertiary">{l.meta}</p>
                  <div className="mt-3 flex justify-between text-xs">
                    <div>
                      <p className="text-text-tertiary">Teams</p>
                      <p className="font-semibold text-text-secondary">20 Clubs</p>
                    </div>
                    <div>
                      <p className="text-text-tertiary">Matches</p>
                      <p className="font-semibold text-text-secondary">380 Total</p>
                    </div>
                  </div>
                  <Link to={`/leagues/${l.id}`}>
                    <Button variant="flat" radius="full" className="mt-3 w-full bg-surface-raised text-text-primary">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardBase>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 flex items-center gap-2 font-display text-2xl font-bold text-text-primary">
            <TrendingUp className="h-5 w-5 text-secondary" /> Trending Leagues
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {trending.map((t) => (
              <div key={t.rank} className="flex items-center gap-4 rounded-md bg-surface p-4">
                <img src={img(t.thumb, 160, 160)} alt="" className="h-16 w-16 shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-primary">#{t.rank} Trending</p>
                  <p className="truncate font-display text-base font-bold text-text-primary">{t.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-text-tertiary">{t.desc}</p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-text-tertiary" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Recently Viewed</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {recentlyViewed.map((r) => (
              <CardBase key={r.title}>
                <div className="aspect-video w-full overflow-hidden">
                  <img src={img(r.thumb, 500, 300)} alt={r.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-bold text-text-primary">{r.title}</p>
                  <p className="text-xs text-text-tertiary">{r.meta}</p>
                </div>
              </CardBase>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
