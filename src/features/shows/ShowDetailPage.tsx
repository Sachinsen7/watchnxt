import { RevealSection } from "@/components/rails/RevealSection";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Play, Clapperboard, Share2, Download, Plus } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShowCard } from "@/components/cards/ShowCard";
import { useGetShowsQuery } from "@/store/api/contentApi";
import { img } from "@/mocks/sports";

const episodes = [
  { n: 1, title: "The Boy from Rosario", desc: "Early beginnings and the medical struggle that changed everything.", duration: "42 mins", thumb: "ep-1" },
  { n: 2, title: "The Napkin Contract", desc: "Crossing the Atlantic to join La Masia and the historic agreement.", duration: "48 mins", thumb: "ep-2" },
  { n: 3, title: "Debut at the Camp Nou", desc: "The world gets its first glimpse of the magic.", duration: "52 mins", thumb: "ep-3" },
];

const extras = [
  { title: "Behind the Magic: Filming Qatar", meta: "Bonus Content • 12 mins", thumb: "extra-1" },
  { title: "Official Season 2 Teaser", meta: "Trailer • 2 mins", thumb: "extra-2" },
];

export function ShowDetailPage() {
  const { id } = useParams();
  const { data: shows = [] } = useGetShowsQuery();
  const show = shows.find((s) => s.id === id) ?? shows[0];
  const [season, setSeason] = useState("Season 1");

  if (!show) return null;

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="relative mt-4 overflow-hidden">
        <img src={img("show-detail-hero", 1600, 700)} alt="" className="h-[420px] w-full object-cover md:h-[480px]" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end gap-3 px-6 pb-8 md:px-10">
          <div className="flex items-center gap-2">
            <Badge kind="live">Live Now</Badge>
            <span className="rounded-sm bg-black/50 px-2 py-1 text-xs font-bold uppercase tracking-wide text-text-primary backdrop-blur">
              Premium Original
            </span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-text-primary">{show.title}</h1>
          <p className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
            <span className="text-premium">★ 9.8</span> Documentary • 2024
            <Badge kind="4k">4K UHD</Badge> 3 Seasons • 24 Episodes • 12h 45m
          </p>
          <p className="max-w-2xl text-sm text-text-secondary">
            Witness the definitive journey of football's greatest icon — from the humble dusty pitches to the
            glorious golden trophy, explore the untold stories, heartbreaks, and ultimate triumph.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button
              variant="flat"
              radius="full"
              className="bg-premium px-6 text-canvas shadow-[0_4px_20px_rgba(245,185,61,0.35)] hover:brightness-110"
              startContent={<Play className="h-4 w-4 fill-current" />}
            >
              Watch Now
            </Button>
            <Button variant="flat" radius="full" className="bg-white/10 px-6 text-text-primary" startContent={<Clapperboard className="h-4 w-4" />}>
              Watch Trailer
            </Button>
            <Button variant="glass-icon" aria-label="Save">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="glass-icon" aria-label="Share"><Share2 className="h-4 w-4" /></Button>
            <Button variant="glass-icon" aria-label="Download"><Download className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6 px-6 md:px-10">
        <div className="flex flex-wrap gap-3">
          {[
            ["Seasons", "03"],
            ["Episodes", "24"],
            ["Quality", "4K HDR"],
          ].map(([l, v]) => (
            <div
              key={l}
              className="flex h-20 w-28 shrink-0 flex-col items-center justify-center rounded-md border border-white/10 bg-surface text-center shadow-lg shadow-black/50 sm:w-32"
            >
              <p className="text-[10px] font-bold uppercase text-text-tertiary">{l}</p>
              <p className="mt-1 font-display text-lg font-extrabold text-[#EEDBFF]">{v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 pb-10 pt-8 md:px-10 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-10">
          <RevealSection>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-text-primary">Episodes</h2>
              <div className="flex gap-2">
                {["Season 1", "Season 2", "Season 3"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeason(s)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      season === s
                        ? "bg-[#EEDBFF] text-canvas"
                        : "bg-surface text-text-tertiary hover:text-text-secondary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {episodes.map((e) => (
                <div key={e.n} className="flex gap-4 rounded-md border border-white/10 bg-surface p-4">
                  <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-md">
                    <img src={img(e.thumb, 400, 225)} alt={e.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-text-primary">
                        {e.n}. {e.title}
                      </p>
                      <span className="shrink-0 text-xs text-text-tertiary">{e.duration}</span>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection>
            <h2 className="mb-4 font-display text-xl font-bold text-text-primary">Trailers &amp; Extras</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {extras.map((e) => (
                <div key={e.title} className="relative aspect-video overflow-hidden rounded-md border border-white/10">
                  <img src={img(e.thumb, 700, 400)} alt={e.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                      <Play className="h-4 w-4 fill-white text-white" />
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-sm font-semibold text-text-primary">{e.title}</p>
                    <p className="text-xs text-text-tertiary">{e.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-lg border border-white/10 bg-surface p-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-tertiary">Continue Watching</h3>
            <div className="flex flex-col gap-3">
              {shows.slice(0, 2).map((s) => (
                <div key={s.id} className="flex gap-3">
                  <img src={s.thumbnail} alt={s.title} className="h-14 w-14 shrink-0 rounded-md object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text-primary">{s.title}</p>
                    <p className="text-xs text-text-tertiary">{s.seasonLabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-surface p-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-tertiary">Trending Shows</h3>
            <div className="flex flex-col gap-3">
              {shows.slice(0, 2).map((s) => (
                <div key={`t-${s.id}`} className="relative aspect-video overflow-hidden rounded-md border border-white/10">
                  <img src={s.thumbnail} alt={s.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                  <p className="absolute bottom-2 left-2 right-2 truncate text-xs font-semibold text-text-primary">
                    {s.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="px-6 pb-14 md:px-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-text-primary">Related Shows</h2>
          <Link to="/shows" className="text-sm font-medium text-tertiary">
            View All &gt;
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {shows
            .filter((s) => s.id !== show.id)
            .slice(0, 4)
            .map((s) => (
              <ShowCard key={s.id} show={s} />
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
