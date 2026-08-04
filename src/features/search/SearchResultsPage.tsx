import { RevealSection } from "@/components/rails/RevealSection";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TrendingUp, ChevronRight, Shield, Plus, Play } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShortsCard } from "@/components/cards/ShortsCard";
import {
  useGetLiveMatchesQuery,
  useGetHighlightsQuery,
  useGetShortsQuery,
  useGetPlayerStoriesQuery,
} from "@/store/api/contentApi";
import { img } from "@/mocks/sports";

const filters = ["All", "Live", "Upcoming", "Highlights", "Shorts", "Shows", "Players"];

const trendingSearches = [
  ["IPL 2024 Final Live", "84k+"],
  ["F1 Monaco Qualifying", "62k+"],
  ["Champions League Draw", "51k+"],
  ["NBA Finals Schedule", "44k+"],
];

const popularPlayers = [
  { name: "Neymar Jr", seed: "pop-player-1" },
  { name: "LeBron J.", seed: "pop-player-2" },
  { name: "Iga S.", seed: "pop-player-3" },
];

const topPlayers = [
  { name: "Lionel Messi", meta: "Inter Miami CF • FW", seed: "top-p-1" },
  { name: "Kylian Mbappé", meta: "Real Madrid • FW", seed: "top-p-2" },
];

const featuredTeams = [
  { name: "Inter Miami CF", meta: "Major League Soccer • US" },
  { name: "FC Barcelona", meta: "La Liga • Spain" },
];

export function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const [filter, setFilter] = useState("All");
  const { data: liveMatches = [] } = useGetLiveMatchesQuery();
  const { data: highlights = [] } = useGetHighlightsQuery();
  const { data: shorts = [] } = useGetShortsQuery();
  const { data: stories = [] } = useGetPlayerStoriesQuery();
  const topResult = stories[1];

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar searchPlaceholder={query || "Search matches, players..."} />
      </div>

      <div className="px-6 pt-6 md:px-10">
        <h1 className="font-display text-2xl font-bold text-text-primary">Search Results</h1>
        <p className="mt-1 max-w-2xl text-sm text-text-secondary">
          Find live matches, leagues, teams, players, highlights, shorts, and exclusive sports content.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-5 md:px-10">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-[#EEDBFF] text-canvas"
                  : "bg-surface text-text-tertiary hover:text-text-secondary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FilterSelect label="Sport" value="All" />
          <FilterSelect label="Date" value="Any" />
          <FilterSelect label="Sort" value="Relevance" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 py-8 md:px-10 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-10">
          {topResult && (
            <div className="relative overflow-hidden rounded-lg border border-white/10">
              <img src={topResult.thumbnail} alt={topResult.title} className="h-[340px] w-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end gap-3 p-8">
                <span className="w-fit rounded-sm bg-premium px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-canvas">
                  Top Result
                </span>
                <h2 className="max-w-xl font-display text-3xl font-extrabold text-text-primary">{topResult.title}</h2>
                <p className="max-w-lg text-sm text-text-secondary">{topResult.description}</p>
                <div className="mt-2 flex gap-3">
                  <Link to={`/player-stories/${topResult.id}`}>
                    <Button
                      variant="flat"
                      radius="full"
                      className="bg-premium px-6 text-canvas shadow-[0_4px_20px_rgba(245,185,61,0.35)] hover:brightness-110"
                      startContent={<Play className="h-4 w-4 fill-current" />}
                    >
                      Watch Now
                    </Button>
                  </Link>
                  <Button variant="glass-icon" aria-label="Save">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <RevealSection>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-text-primary">Live Matches</h2>
              <Link to="/live" className="text-sm font-medium text-tertiary">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {liveMatches.slice(0, 2).map((m) => (
                <div key={m.id} className="relative overflow-hidden rounded-lg border border-white/10 shadow-lg shadow-black/40">
                  <img src={m.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-surface/85" />
                  <div className="relative p-5">
                    <div className="flex items-center gap-2">
                      <Badge kind="live">Live • {m.scoreSubLine?.split(" ").pop()}</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-col items-center gap-1">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-danger/20 text-[10px] font-bold text-danger">
                          {m.teams[0].short}
                        </span>
                      </div>
                      <p className="font-display text-2xl font-extrabold text-text-primary">{m.scoreLine}</p>
                      <p className="text-xs text-text-tertiary">{m.league}</p>
                      <div className="flex flex-col items-center gap-1">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 text-[10px] font-bold text-secondary">
                          {m.teams[1].short}
                        </span>
                      </div>
                    </div>
                    <Link to={`/live/${m.id}/watch`}>
                      <Button variant="flat" radius="full" className="mt-4 w-full bg-surface-raised text-text-primary">
                        Watch Live
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-xl font-bold text-text-primary">Top Players</h2>
              <div className="flex flex-col gap-3">
                {topPlayers.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 rounded-md border border-white/10 bg-surface p-3"
                  >
                    <img src={img(p.seed, 80, 80)} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-text-primary">{p.name}</p>
                      <p className="truncate text-xs text-text-tertiary">{p.meta}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-text-tertiary" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-4 font-display text-xl font-bold text-text-primary">Featured Teams</h2>
              <div className="flex flex-col gap-3">
                {featuredTeams.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center gap-3 rounded-md border border-white/10 bg-surface p-3"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-raised">
                      <Shield className="h-5 w-5 text-tertiary" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-text-primary">{t.name}</p>
                      <p className="truncate text-xs text-text-tertiary">{t.meta}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-text-tertiary" />
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-text-primary">Recent Highlights</h2>
              <Link to="/highlights" className="text-sm font-medium text-tertiary">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((h) => (
                <Link key={h.id} to={`/highlights/${h.id}`} className="block">
                  <div className="relative aspect-video w-full overflow-hidden rounded-md border border-white/10">
                    <img src={h.thumbnail} alt={h.title} className="h-full w-full object-cover" />
                    <div className="absolute bottom-2 right-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                      {h.duration}
                    </div>
                  </div>
                  <div className="pt-3">
                    <p className="truncate text-sm font-semibold text-text-primary">{h.title}</p>
                    <p className="mt-1 truncate text-xs text-text-tertiary">
                      {h.league} • {h.postedAgo}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </RevealSection>

          <RevealSection>
            <h2 className="mb-5 font-display text-xl font-bold text-text-primary">WatchNXT Shorts</h2>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
              {[...shorts, ...shorts].slice(0, 6).map((s, i) => (
                <ShortsCard key={`${s.id}-${i}`} short={s} />
              ))}
            </div>
          </RevealSection>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-lg border border-white/10 bg-surface p-5">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-text-tertiary">
              <TrendingUp className="h-4 w-4 text-tertiary" /> Trending Now
            </h3>
            <div className="flex flex-col gap-3">
              {trendingSearches.map(([label, count]) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{label}</span>
                  <span className="rounded-full bg-surface-raised px-2 py-0.5 text-[10px] font-semibold text-text-tertiary">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-surface p-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-tertiary">Popular Players</h3>
            <div className="flex gap-4">
              {popularPlayers.map((p) => (
                <div key={p.name} className="text-center">
                  <img
                    src={img(p.seed, 80, 80)}
                    alt=""
                    className="mx-auto mb-1 h-12 w-12 rounded-full object-cover ring-2 ring-tertiary/40"
                  />
                  <p className="text-xs text-text-secondary">{p.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-surface p-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-tertiary">Recently Viewed</h3>
            <div className="flex flex-col gap-3">
              {highlights.slice(0, 2).map((h) => (
                <div key={h.id} className="flex gap-3">
                  <img src={h.thumbnail} alt={h.title} className="h-12 w-12 shrink-0 rounded-md object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text-primary">{h.title}</p>
                    <p className="text-xs text-text-tertiary">{h.postedAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="border-t border-white/5 px-6 py-8 md:px-10">
        <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold text-text-primary">142 Total Results</p>
            <p className="text-xs text-text-tertiary">Found</p>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-text-primary">0.42s</p>
            <p className="text-xs text-text-tertiary">Search Time</p>
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Can't find what you're looking for?</p>
          </div>
          <Link to="#" className="flex flex-col items-center justify-center">
            <p className="text-sm font-semibold text-tertiary">Try Advanced Filters</p>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
