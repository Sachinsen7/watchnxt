import { RevealSection } from "@/components/rails/RevealSection";
import { useParams, Link } from "react-router-dom";
import { Users, CalendarDays, Repeat, PlayCircle, Video, Film, Bell, Share2, Plus } from "lucide-react";
import {
  FaFutbol,
  FaBaseballBatBall,
  FaFlagCheckered,
  FaTableTennisPaddleBall,
  FaPersonRunning,
  FaBasketball,
} from "react-icons/fa6";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Button } from "@/components/ui/Button";
import { StatBox } from "@/components/ui/StatBox";
import { Badge } from "@/components/ui/Badge";
import { ShortsCard } from "@/components/cards/ShortsCard";
import { useGetLeaguesQuery, useGetHighlightsQuery, useGetShortsQuery } from "@/store/api/contentApi";
import { img } from "@/mocks/sports";
import type { SportId } from "@/types/content";

const sportIcon: Record<SportId, typeof FaFutbol> = {
  football: FaFutbol,
  cricket: FaBaseballBatBall,
  f1: FaFlagCheckered,
  tennis: FaTableTennisPaddleBall,
  kabaddi: FaPersonRunning,
  basketball: FaBasketball,
};

const ongoingMatches = [
  { home: "Arsenal", away: "Chelsea", score: "2 - 1", minute: "74'" },
  { home: "Man City", away: "Liverpool", score: "0 - 0", minute: "12'" },
];

const upcomingFixtures = [
  { date: "OCT 28", title: "Man United vs Tottenham", meta: "Old Trafford | 20:00 GMT" },
  { date: "OCT 29", title: "Newcastle vs Everton", meta: "St James' Park | 15:00 GMT" },
];

const starPlayers = [
  { name: "Erling Haaland", meta: "Man City • Forward", goals: 15, assists: 4 },
  { name: "Mohamed Salah", meta: "Liverpool • Forward", goals: 12, assists: 8 },
  { name: "Bukayo Saka", meta: "Arsenal • Midfielder", goals: 9, assists: 10 },
];

const standings = [
  { pos: 1, team: "Arsenal", p: 12, w: 9, l: 1, pts: 28 },
  { pos: 2, team: "Man City", p: 12, w: 8, l: 2, pts: 26 },
  { pos: 3, team: "Liverpool", p: 12, w: 7, l: 2, pts: 24 },
];

const originalShows = [
  { title: "All or Nothing: Arsenal", meta: "Exclusive Access • 8 Episodes", thumb: "orig-show-1" },
  { title: "The Last Trophy: Klopp's Legacy", meta: "Documentary • 120 mins", thumb: "orig-show-2" },
];

export function LeagueDetailPage() {
  const { id } = useParams();
  const { data: leagues = [] } = useGetLeaguesQuery();
  const { data: highlights = [] } = useGetHighlightsQuery();
  const { data: shorts = [] } = useGetShortsQuery();
  const league = leagues.find((l) => l.id === id) ?? leagues[0];

  if (!league) return null;

  const SportIcon = sportIcon[league.sport];

  return (
    <div>
      <div className="relative overflow-hidden">
        <img
          src={img("league-detail-hero", 1600, 700)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/70 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

        <div className="relative flex min-h-[460px] flex-col md:min-h-[560px]">
          <div className="px-6 pt-4 md:px-10">
            <TopBar />
          </div>

          <div className="mt-auto px-6 pb-6 md:px-10">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-tertiary/15">
                <SportIcon className="h-7 w-7 text-tertiary" />
              </div>
              <div className="flex-1">
                <h1 className="font-display text-2xl font-bold text-text-primary">{league.name}</h1>
                <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-tertiary">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" /> {league.meta}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> 20 Teams
                  </span>
                  <span className="flex items-center gap-1">
                    <Repeat className="h-3.5 w-3.5" /> 380 Matches
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link to="/live">
                <Button variant="gradient" radius="full" className="px-6" startContent={<PlayCircle className="h-4 w-4" />}>
                  Watch Live
                </Button>
              </Link>
              <Link to="/upcoming">
                <Button variant="flat" radius="full" className="bg-surface-raised px-6 text-text-primary">
                  View Schedule
                </Button>
              </Link>
              <a href="#standings">
                <Button variant="flat" radius="full" className="bg-surface-raised px-6 text-text-primary">
                  Points Table
                </Button>
              </a>
              <Button variant="glass-icon" aria-label="Save">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="glass-icon" aria-label="Share">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-14 px-6 py-12 md:px-10">
        <RevealSection className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-xl font-bold text-text-primary">League Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              The {league.name} is the pinnacle of global {league.sport}, featuring the most competitive clubs and
              world-class talent. The {league.meta} promises unprecedented drama as contenders battle for the
              historic trophy across a full season of high-intensity action.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <StatBox value="20" label="Teams" icon={Users} />
            <StatBox value="142" label="Matches Played" icon={CalendarDays} />
            <StatBox value="238" label="Upcoming" icon={Repeat} />
            <StatBox value="2" label="Live Now" icon={PlayCircle} accent="primary" />
            <StatBox value="1.2k" label="Videos" icon={Video} />
            <StatBox value="450+" label="Highlights" icon={Film} />
          </div>
        </RevealSection>

        <RevealSection>
          <h2 className="mb-5 flex items-center gap-2 font-display text-2xl font-bold text-text-primary">
            <span className="h-2 w-2 rounded-full bg-live" /> Ongoing Matches
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {ongoingMatches.map((m) => (
              <div key={m.home} className="rounded-lg border border-white/10 bg-surface p-6 shadow-lg shadow-black/40">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-surface-raised text-sm font-bold text-text-secondary">
                      {m.home[0]}
                    </div>
                    <p className="text-sm font-semibold text-text-primary">{m.home}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-2xl font-extrabold text-text-primary">{m.score}</p>
                    <p className="text-xs text-primary">{m.minute}</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-surface-raised text-sm font-bold text-text-secondary">
                      {m.away[0]}
                    </div>
                    <p className="text-sm font-semibold text-text-primary">{m.away}</p>
                  </div>
                </div>
                <Button variant="flat" radius="full" className="mt-5 w-full bg-live/20 text-live" startContent={<PlayCircle className="h-4 w-4" />}>
                  Watch Live
                </Button>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Upcoming Fixtures</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {upcomingFixtures.map((f) => (
              <div key={f.title} className="flex items-center gap-4 rounded-md border border-white/10 bg-surface p-4">
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase text-text-tertiary">{f.date.split(" ")[0]}</p>
                  <p className="font-display text-xl font-extrabold text-text-primary">{f.date.split(" ")[1]}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">{f.title}</p>
                  <p className="text-xs text-text-tertiary">{f.meta}</p>
                </div>
                <Button variant="glass-icon" size="sm" aria-label="Remind me">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Latest Highlights</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
          </div>
        </RevealSection>

        <RevealSection>
          <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">League Shorts</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...shorts, ...shorts].slice(0, 8).map((s, i) => (
              <div key={`${s.id}-${i}`} className="w-[160px] shrink-0">
                <ShortsCard short={s} />
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Star Players</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {starPlayers.map((p) => (
              <div key={p.name} className="rounded-lg border border-white/10 bg-surface p-5">
                <p className="font-display text-lg font-bold text-text-primary">{p.name}</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-secondary">{p.meta}</p>
                <div className="mt-4 flex gap-6">
                  <span className="text-sm text-text-secondary">
                    <span className="font-display text-xl font-extrabold text-text-primary">{p.goals}</span> Goals
                  </span>
                  <span className="text-sm text-text-secondary">
                    <span className="font-display text-xl font-extrabold text-text-primary">{p.assists}</span> Asst
                  </span>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="standings" className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Standings Preview</h2>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-surface">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] font-bold uppercase tracking-wide text-text-tertiary">
                    <th className="px-5 py-3 text-left">Pos</th>
                    <th className="px-5 py-3 text-left">Team</th>
                    <th className="px-5 py-3 text-left">P</th>
                    <th className="px-5 py-3 text-left">W</th>
                    <th className="px-5 py-3 text-left">L</th>
                    <th className="px-5 py-3 text-left">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row) => (
                    <tr key={row.pos} className="odd:bg-surface-raised/50">
                      <td className="px-5 py-3 font-semibold text-text-primary">{row.pos}</td>
                      <td className="flex items-center gap-2 px-5 py-3 text-text-primary">
                        <span className="h-4 w-4 shrink-0 rounded-full bg-surface-raised" /> {row.team}
                      </td>
                      <td className="px-5 py-3 text-text-secondary">{row.p}</td>
                      <td className="px-5 py-3 text-text-secondary">{row.w}</td>
                      <td className="px-5 py-3 text-text-secondary">{row.l}</td>
                      <td className="px-5 py-3 font-bold text-text-primary">{row.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="w-full border-t border-white/5 py-3 text-center text-xs font-bold uppercase tracking-wide text-tertiary">
                Full Standings Table
              </button>
            </div>
          </div>

          <div>
            <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Original Shows</h2>
            <div className="flex flex-col gap-4">
              {originalShows.map((s) => (
                <div key={s.title} className="flex items-center gap-4 rounded-lg border border-white/10 bg-surface p-3">
                  <img
                    src={img(s.thumb, 200, 200)}
                    alt={s.title}
                    className="h-16 w-16 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-text-primary">{s.title}</p>
                    <p className="mt-0.5 truncate text-xs text-text-tertiary">{s.meta}</p>
                    <div className="mt-1.5 flex gap-1.5">
                      <Badge kind="premium">Original</Badge>
                      <Badge kind="hd">4K HDR</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>

      <Footer />
    </div>
  );
}
