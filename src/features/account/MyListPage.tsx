import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  Radio,
  Film,
  Zap,
  Tv,
  BookOpen,
  Trash2,
  Share2,
  Play,
  Check,
  Bell,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useGetContinueWatchingQuery, useGetUpcomingMatchesQuery } from "@/store/api/contentApi";
import { formatCountdown } from "@/lib/utils";
import { img } from "@/mocks/sports";

const stats = [
  { icon: Bookmark, value: "124", label: "Saved Items" },
  { icon: Radio, value: "", label: "Live Matches" },
  { icon: Film, value: "", label: "Highlights" },
  { icon: Zap, value: "", label: "Shorts" },
  { icon: Tv, value: "", label: "Shows" },
  { icon: BookOpen, value: "", label: "Stories" },
];

const filters = ["All Items", "Live", "Highlights", "Shorts", "Leagues"];

const favorites = [
  { title: "Beyond the Court:", meta: "STORY • 45m", thumb: "list-1" },
  { title: "Tactical Genius:...", meta: "SERIES • Ep 4", thumb: "list-2" },
  { title: "The Great North...", meta: "FILM • 1h 20m", thumb: "list-3" },
  { title: "Gravity Defied", meta: "SHORT • 12m", thumb: "list-4" },
  { title: "Mud and Glory", meta: "SERIES • New", thumb: "list-5" },
];

export function MyListPage() {
  const { data: continueWatching = [] } = useGetContinueWatchingQuery();
  const { data: upcomingMatches = [] } = useGetUpcomingMatchesQuery();
  const [filter, setFilter] = useState("All Items");

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-6 md:px-10">
        <h1 className="font-display text-2xl font-bold text-text-primary">My List</h1>
        <p className="mt-1 text-sm text-text-secondary">Your personal collection of saved sports content.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 px-6 pt-6 sm:grid-cols-6 md:px-10">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`rounded-md border p-4 text-center ${
              i === 0 ? "border-secondary/40 bg-secondary/15" : "border-white/10 bg-surface"
            }`}
          >
            <s.icon className={`mx-auto mb-2 h-5 w-5 ${i === 0 ? "text-secondary" : "text-text-secondary"}`} />
            {i === 0 ? <p className="font-display text-xl font-extrabold text-secondary">{s.value}</p> : null}
            <p className="text-[10px] font-bold uppercase tracking-wide text-text-tertiary">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6 md:px-10">
        <div className="flex flex-wrap gap-2">
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
        <div className="flex flex-wrap gap-2">
          <FilterSelect label="Sport" value="All" />
          <FilterSelect label="Sort" value="Recently Added" />
        </div>
      </div>

      <div className="flex flex-col gap-14 px-6 py-10 md:px-10">
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-text-primary">Continue Watching</h2>
            <button className="text-sm font-medium text-tertiary">View All</button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {continueWatching.map((item) => (
              <div key={item.id} className="rounded-lg border border-white/10 bg-surface p-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                  <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
                  <span className="absolute left-2 top-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Continue
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
                    <div className="h-full bg-secondary" style={{ width: `${item.progressPct}%` }} />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="truncate font-semibold text-text-primary">{item.title}</p>
                  <p className="text-xs text-text-tertiary">{item.meta}</p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button
                    variant="flat"
                    radius="full"
                    className="flex-1 bg-premium text-canvas shadow-[0_4px_20px_rgba(245,185,61,0.35)] hover:brightness-110"
                    startContent={<Play className="h-4 w-4 fill-current" />}
                  >
                    Watch Now
                  </Button>
                  <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-raised text-text-tertiary hover:text-text-primary">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-raised text-text-tertiary hover:text-text-primary">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">My Favorites</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {favorites.map((r) => (
              <div key={r.title} className="overflow-hidden rounded-md border border-white/10 bg-surface">
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                  <img src={img(r.thumb, 400, 600)} alt={r.title} className="h-full w-full object-cover" />
                  <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-tertiary text-canvas">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </div>
                <div className="p-2.5">
                  <p className="truncate text-sm font-semibold text-text-primary">{r.title}</p>
                  <p className="truncate text-[11px] font-bold uppercase tracking-wide text-[#DB2777]">{r.meta}</p>
                  <button className="mt-2 w-fit rounded-full bg-[#EEDBFF] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-canvas hover:brightness-95">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {upcomingMatches.length > 0 && (
          <section>
            <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">My Reminders</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingMatches.slice(0, 3).map((m) => (
                <div key={m.id} className="overflow-hidden rounded-lg border border-white/10 bg-surface">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img src={m.thumbnail} alt={m.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute left-2 top-2 flex gap-1.5">
                      {m.tags?.map((t) => (
                        <Badge key={t} kind={t === "HD" ? "hd" : "multi-lang"}>
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <span className="absolute bottom-2 left-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-premium">
                      {formatCountdown(m.startsAt)}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-danger/20 text-[9px] font-bold text-danger">
                        {m.teams[0].short}
                      </span>
                      <span className="text-xs text-text-tertiary">vs</span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20 text-[9px] font-bold text-secondary">
                        {m.teams[1].short}
                      </span>
                      <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-text-tertiary">
                        {m.league}
                      </span>
                    </div>
                    <p className="mt-2 font-display text-base font-bold text-text-primary">{m.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-text-tertiary">
                      <CalendarDays className="h-3.5 w-3.5" /> {new Date(m.startsAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} • {new Date(m.startsAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    {m.venue && (
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-text-tertiary">
                        <MapPin className="h-3.5 w-3.5" /> {m.venue}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-2">
                      <Link to={`/upcoming/${m.id}`} className="flex-1">
                        <Button
                          variant="flat"
                          radius="full"
                          className="w-full bg-premium text-canvas shadow-[0_4px_20px_rgba(245,185,61,0.35)] hover:brightness-110"
                        >
                          Starts in {formatCountdown(m.startsAt).replace("Starts in ", "")}
                        </Button>
                      </Link>
                      <Button variant="glass-icon" aria-label="Reminder settings">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
