import { RevealSection } from "@/components/rails/RevealSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Clock, Play, Share2, SlidersHorizontal, Plus } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { FilterPill } from "@/components/ui/FilterPill";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CardBase } from "@/components/cards/CardBase";
import { ContinueWatchingCard } from "@/components/cards/ContinueWatchingCard";
import { useGetHighlightsQuery, useGetContinueWatchingQuery } from "@/store/api/contentApi";
import { formatCount } from "@/lib/utils";
import { img } from "@/mocks/sports";
import type { Highlight } from "@/types/content";

const filters = ["Trending", "Cricket", "Football", "Formula 1", "Today", "Most Watched"];

const metaFilters = [
  { label: "Sport", value: "All" },
  { label: "League", value: "Premier League" },
  { label: "Status", value: "Completed" },
  { label: "Sort", value: "Most Recent" },
];

function HighlightGridCard({ highlight, index }: { highlight: Highlight; index: number }) {
  const views = 90_000 + index * 137_000;

  return (
    <CardBase>
      <Link to={`/highlights/${highlight.id}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden">
          <img src={highlight.thumbnail} alt={highlight.title} className="h-full w-full object-cover" />
          <div className="absolute left-2 top-2">
            <Badge kind="sport">{highlight.league}</Badge>
          </div>
          <div className="absolute bottom-2 right-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-white">
            {highlight.duration}
          </div>
        </div>
      </Link>
      <div className="p-3.5">
        <Link to={`/highlights/${highlight.id}`}>
          <p className="line-clamp-2 text-sm font-semibold text-text-primary">{highlight.title}</p>
        </Link>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-text-tertiary">
          {highlight.league} • {highlight.postedAgo}
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" /> {formatCount(views)}
          </span>
        </p>
        <div className="mt-3 flex items-center justify-between">
          <Link
            to={`/highlights/${highlight.id}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-tertiary"
          >
            <Play className="h-3.5 w-3.5 fill-current" /> Watch
          </Link>
          <button aria-label="Share" className="text-text-tertiary transition-colors hover:text-text-primary">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </CardBase>
  );
}

const latestResults = [
  { league: "T20 World Cup", status: "Final", home: "IND", homeScore: "176/7", away: "SA", awayScore: "169/8", note: "IND won by 7 runs" },
  { league: "Premier League", status: "Full Time", home: "LIV", homeScore: "3", away: "CHE", awayScore: "1", note: "" },
];

const trendingLeagues = [
  { code: "PL", name: "Premier League", followers: "24M following" },
  { code: "WC", name: "T20 World Cup", followers: "112M following" },
  { code: "F1", name: "Formula 1", followers: "18M following" },
];

const topPlayers = ["top-player-1", "top-player-2", "top-player-3", "top-player-4"];

export function HighlightsPage() {
  const { data: highlights = [] } = useGetHighlightsQuery();
  const { data: continueWatching = [] } = useGetContinueWatchingQuery();
  const [filter, setFilter] = useState("Trending");
  const hero = highlights[0];

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-6 md:px-10">
        <h1 className="font-display text-2xl font-bold text-text-primary">Match Highlights</h1>
        <p className="mt-1 max-w-2xl text-sm text-text-secondary">
          Catch up on the best moments from every match with official highlight videos, high-definition replays, and
          expert analysis.
        </p>
      </div>

      {hero && (
        <div className="px-6 pt-6 md:px-10">
          <div className="relative overflow-hidden rounded-lg">
            <img src={hero.thumbnail} alt={hero.title} className="h-[300px] w-full object-cover md:h-[360px]" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end gap-3 p-8">
              <div className="flex items-center gap-2">
                <span className="rounded-sm bg-tertiary px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-canvas">
                  {hero.badge ?? "World Cup Final"}
                </span>
                <span className="flex items-center gap-1 text-xs text-text-tertiary">
                  <Eye className="h-3.5 w-3.5" /> 4.2M views
                </span>
              </div>
              <h2 className="max-w-2xl font-display text-3xl font-extrabold text-text-primary">{hero.title}</h2>
              <p className="flex items-center gap-1.5 text-sm text-text-tertiary">
                <Clock className="h-3.5 w-3.5" /> {hero.duration} • {hero.postedAgo}
              </p>
              <div className="mt-2 flex gap-3">
                <Link to={`/highlights/${hero.id}`}>
                  <Button
                    variant="flat"
                    radius="md"
                    className="bg-premium px-6 text-canvas shadow-[0_4px_20px_rgba(245,185,61,0.35)] hover:brightness-110"
                    startContent={<Play className="h-4 w-4 fill-current" />}
                  >
                    Watch Now
                  </Button>
                </Link>
                <Button
                  variant="flat"
                  radius="full"
                  className="bg-white/10 px-6 text-text-primary"
                  startContent={<Plus className="h-4 w-4" />}
                >
                  Save to List
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 px-6 pt-6 md:px-10">
        {filters.map((f) => (
          <FilterPill key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 px-6 pt-3 text-xs text-text-tertiary md:px-10">
        <SlidersHorizontal className="h-3.5 w-3.5" />
        <span className="font-semibold text-text-secondary">Filter</span>
        {metaFilters.map((f) => (
          <span key={f.label} className="flex items-center gap-1 border-l border-white/10 pl-2">
            {f.label}: <span className="font-semibold text-text-secondary">{f.value}</span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 py-10 md:px-10 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...highlights, ...highlights].slice(0, 6).map((h, i) => (
              <HighlightGridCard key={`${h.id}-${i}`} highlight={h} index={i} />
            ))}
          </div>

          <RevealSection>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-text-primary">Recommended For You</h2>
              <Link to="#" className="text-sm font-medium text-tertiary">
                View All &gt;
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h, i) => (
                <HighlightGridCard key={`rec-${h.id}`} highlight={h} index={i} />
              ))}
            </div>
          </RevealSection>

          {continueWatching.length > 0 && (
            <RevealSection>
              <h2 className="mb-5 font-display text-xl font-bold text-text-primary">Continue Watching</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {continueWatching.map((item) => (
                  <ContinueWatchingCard key={item.id} item={item} />
                ))}
              </div>
            </RevealSection>
          )}
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-lg border border-white/10 bg-surface p-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-tertiary">Latest Results</h3>
            <div className="flex flex-col gap-4">
              {latestResults.map((r) => (
                <div key={r.league} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between text-xs text-text-tertiary">
                    <span>{r.league}</span>
                    <span>{r.status}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-text-primary">{r.home}</span>
                    <span className="font-bold text-text-primary">{r.homeScore}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="font-semibold text-text-primary">{r.away}</span>
                    <span className="font-bold text-text-primary">{r.awayScore}</span>
                  </div>
                  {r.note && <p className="mt-1 text-xs text-primary">{r.note}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-surface p-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-tertiary">Trending Leagues</h3>
            <div className="flex flex-col gap-3">
              {trendingLeagues.map((l) => (
                <div key={l.code} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-raised text-[11px] font-bold text-text-secondary">
                    {l.code}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{l.name}</p>
                    <p className="text-xs text-text-tertiary">{l.followers}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-surface p-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-tertiary">Top Players</h3>
            <div className="flex gap-3">
              {topPlayers.map((seed, i) => (
                <img
                  key={seed}
                  src={img(seed, 80, 80)}
                  alt=""
                  className={`h-10 w-10 rounded-full object-cover ${i === 0 ? "ring-2 ring-tertiary" : ""}`}
                />
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-glow-violet-radial p-6 text-center">
            <img src={img("go-pro", 400, 240)} alt="" className="mx-auto mb-4 h-28 w-full rounded-md object-cover" />
            <p className="font-display text-lg font-bold text-text-primary">Unlock Every Goal, Every Boundary.</p>
            <Link to="/premium">
              <Button variant="gradient" radius="full" className="mt-4 w-full">
                Go PRO Now
              </Button>
            </Link>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
