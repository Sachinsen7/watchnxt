import { RevealSection } from "@/components/rails/RevealSection";
import { useParams, Link } from "react-router-dom";
import { Heart, Bell, CalendarDays, MapPin, CloudSun, TrendingUp } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Rail } from "@/components/rails/Rail";
import { useGetLiveMatchesQuery, useGetHighlightsQuery } from "@/store/api/contentApi";

const timeline = ["Toss", "Powerplay", "50 Runs", "100 Runs", "200 Runs"];

const matchInfo = (match: { startsAt: string; venue?: string }) => [
  { icon: CalendarDays, label: "Date & Time", value: `${new Date(match.startsAt).toLocaleDateString()} • 14:00 IST` },
  { icon: MapPin, label: "Venue", value: match.venue ?? "Narendra Modi Stadium" },
  { icon: CloudSun, label: "Weather & Pitch", value: "28°C • Batting Friendly" },
];

const playingXI = {
  home: [
    ["Rohit Sharma (C)", "Batsman"],
    ["Shubman Gill", "Batsman"],
    ["Virat Kohli", "Batsman"],
    ["KL Rahul (WK)", "Wicket Keeper"],
  ],
  away: [
    ["Travis Head", "Batsman"],
    ["Mitchell Marsh", "All-Rounder"],
    ["Steve Smith", "Batsman"],
    ["Pat Cummins (C)", "Bowler"],
  ],
};

export function LiveMatchDetailPage() {
  const { id } = useParams();
  const { data: matches = [] } = useGetLiveMatchesQuery();
  const { data: highlights = [] } = useGetHighlightsQuery();
  const match = matches.find((m) => m.id === id) ?? matches[0];

  if (!match) return null;

  return (
    <div className="overflow-x-hidden">
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-4 md:px-10">
        <Breadcrumb
          items={[{ label: "Home", to: "/" }, { label: "Live", to: "/live" }, { label: match.league }, { label: match.title }]}
          watchingCount={match.viewerCount}
        />
      </div>

      <div className="relative mt-4 overflow-hidden rounded-lg md:mx-6 md:mx-10">
        <div className="mx-6 overflow-hidden rounded-lg md:mx-10">
          <img src={match.thumbnail} alt={match.title} className="h-[420px] w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent" />

          <div className="absolute right-6 top-6 hidden flex-col gap-2 md:flex">
            {match.tags?.map((t) => (
              <span key={t} className="rounded-md bg-black/50 px-3 py-1.5 text-center text-[10px] font-bold uppercase tracking-wide text-text-secondary backdrop-blur">
                {t}
              </span>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-8">
            <div className="flex items-center gap-2">
              <Badge kind="live">Live</Badge>
              <span className="text-xs font-bold uppercase tracking-wide text-text-tertiary">{match.league}</span>
            </div>
            <h1 className="font-display text-3xl font-extrabold text-text-primary">{match.title}</h1>
            <div className="flex items-end gap-8">
              <div>
                <p className="text-xs uppercase text-text-tertiary">{match.teams[0].name}</p>
                <p className="font-display text-2xl font-extrabold text-text-primary">{match.scoreLine}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-text-tertiary">{match.teams[1].name}</p>
                <p className="font-display text-lg font-bold text-text-tertiary">{match.scoreSubLine}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to={`/live/${match.id}/watch`}>
                <Button variant="gradient" radius="full" className="px-6" startContent="▶">
                  Watch Live
                </Button>
              </Link>
              <Button variant="glass-icon" aria-label="Save">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="glass-icon" aria-label="Remind me">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 py-12 md:px-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-w-0 flex-col gap-10">
          <RevealSection>
            <h2 className="mb-4 font-display text-xl font-bold text-text-primary">Match Information</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {matchInfo(match).map((info) => (
                <div
                  key={info.label}
                  className="flex h-[92px] items-center gap-3 rounded-md border border-white/10 bg-surface p-4 shadow-lg shadow-black/40"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-raised">
                    <info.icon className="h-4 w-4 text-tertiary" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase text-text-tertiary">{info.label}</p>
                    <p className="mt-1 truncate text-sm font-semibold text-text-primary">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection>
            <h2 className="mb-6 font-display text-xl font-bold text-text-primary">Match Timeline</h2>
            <div className="relative rounded-md border border-white/10 bg-surface px-8 py-6 shadow-lg shadow-black/40">
              <div className="absolute left-8 right-8 top-[30px] h-px bg-white/10" />
              <div className="relative flex justify-between">
                {timeline.map((t) => (
                  <div key={t} className="flex flex-col items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-xs text-text-tertiary">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection>
            <h2 className="mb-4 font-display text-xl font-bold text-text-primary">Playing XI</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-text-primary">
                  <span className="h-2.5 w-2.5 rounded-full bg-tertiary" /> Team {match.teams[0].name}
                </p>
                <div className="flex flex-col gap-2">
                  {playingXI.home.map(([name, role]) => (
                    <div key={name} className="flex items-center justify-between rounded-md bg-surface px-3 py-2.5 text-sm">
                      <span className="text-text-primary">{name}</span>
                      <span className="text-xs text-text-tertiary">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-text-primary">
                  <span className="h-2.5 w-2.5 rounded-full bg-premium" /> Team {match.teams[1].name}
                </p>
                <div className="flex flex-col gap-2">
                  {playingXI.away.map(([name, role]) => (
                    <div key={name} className="flex items-center justify-between rounded-md bg-surface px-3 py-2.5 text-sm">
                      <span className="text-text-primary">{name}</span>
                      <span className="text-xs text-text-tertiary">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="flat" radius="full" className="mt-4 w-full bg-surface-raised text-text-primary">
              View Full Squads
            </Button>
          </RevealSection>

          <Rail title="Related Content" itemClassName="w-[280px]" alwaysShowArrows>
            {highlights.map((h) => (
              <Link key={h.id} to={`/highlights/${h.id}`} className="block">
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                  <img src={h.thumbnail} alt={h.title} className="h-full w-full object-cover" />
                  <div className="absolute bottom-2 right-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                    {h.duration}
                  </div>
                </div>
                <div className="pt-3">
                  <p className="truncate text-sm font-semibold text-text-primary">{h.title}</p>
                  <p className="mt-1 truncate text-xs text-text-tertiary">
                    {h.resultLine} • {h.postedAgo}
                  </p>
                </div>
              </Link>
            ))}
          </Rail>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-lg border border-white/10 bg-surface p-5 shadow-lg shadow-black/40">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-tertiary">Real-time Statistics</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Run Rate", "5.76"],
                ["Boundaries", "22"],
                ["Sixes", "06"],
                ["Wickets", "04"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="flex h-20 flex-col items-center justify-center rounded-md border border-white/5 bg-surface-raised p-3 text-center"
                >
                  <p className="text-[10px] font-bold uppercase text-text-tertiary">{l}</p>
                  <p className="mt-1 font-display text-lg font-extrabold text-text-primary">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-surface p-5 shadow-lg shadow-black/40">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-tertiary">Win Probability</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-tertiary">{match.teams[0].short} 62%</span>
              <span className="text-text-tertiary">vs</span>
              <span className="font-bold text-premium">{match.teams[1].short} 38%</span>
            </div>
            <div className="mt-2 flex h-2 overflow-hidden rounded-full">
              <div className="h-full bg-tertiary" style={{ width: "62%" }} />
              <div className="h-full bg-premium" style={{ width: "38%" }} />
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-glow-violet-radial p-5 shadow-lg shadow-black/40">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-text-primary">
              <TrendingUp className="h-4 w-4 text-tertiary" /> Trending Poll
            </h3>
            <p className="mb-3 text-sm text-text-secondary">Who will score the next 50 for {match.teams[0].name}?</p>
            <div className="flex flex-col gap-2">
              {["Virat Kohli", "KL Rahul", "Hardik Pandya"].map((p) => (
                <button key={p} className="rounded-md border border-white/5 bg-surface-raised px-4 py-2.5 text-left text-sm text-text-secondary hover:text-text-primary">
                  {p}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
