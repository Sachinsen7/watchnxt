import { RevealSection } from "@/components/rails/RevealSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { FilterPill } from "@/components/ui/FilterPill";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShortsCard } from "@/components/cards/ShortsCard";
import { useGetShortsQuery } from "@/store/api/contentApi";
import { formatCount } from "@/lib/utils";
import { img } from "@/mocks/sports";

const filters = ["All", "Cricket", "Football", "Formula 1", "Kabaddi", "Tennis", "Trending"];

const latestUploads = [
  { title: "Fan Reactions: Real Madrid Goal", ago: "2m ago", thumb: "up-1" },
  { title: "Inside the Cockpit: Hamilton", ago: "15m ago", thumb: "up-2" },
  { title: "The Slapshot of the Season", ago: "1h ago", thumb: "up-3" },
  { title: "Dressing Room Celebrations", ago: "3h ago", thumb: "up-4" },
];

export function ShortsPage() {
  const { data: shorts = [] } = useGetShortsQuery();
  const [filter, setFilter] = useState("All");
  const hero = shorts[0];

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-6 md:px-10">
        <h1 className="font-display text-2xl font-bold text-text-primary">Sports Shorts</h1>
        <p className="mt-1 max-w-2xl text-sm text-text-secondary">
          Discover bite-sized sports moments, match-winning plays, celebrations, interviews, behind-the-scenes clips,
          and trending highlights.
        </p>
      </div>

      {hero && (
        <div className="px-6 pt-6 md:px-10">
          <div className="relative overflow-hidden rounded-lg">
            <img src={img("shorts-hero", 1600, 700)} alt="" className="h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end gap-3 p-8">
              <div className="flex items-center gap-2">
                <Badge kind="sport">Premier League</Badge>
                <span className="flex items-center gap-1 text-xs text-text-tertiary">
                  <Eye className="h-3.5 w-3.5" /> {formatCount(hero.views)} Views
                </span>
              </div>
              <h2 className="max-w-xl font-display text-3xl font-extrabold text-text-primary">{hero.title}</h2>
              <div className="mt-2 flex gap-3">
                <Link to={`/shorts/${hero.id}`}>
                  <Button variant="gradient" radius="full" className="px-6">
                    Play Now
                  </Button>
                </Link>
                <Button variant="glass-icon" aria-label="Save">
                  +
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

      <div className="flex flex-col gap-14 px-6 py-10 md:px-10">
        <RevealSection>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-text-primary">Trending Today</h2>
            <Link to="#" className="text-sm font-medium text-tertiary">
              View All
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...shorts, ...shorts].slice(0, 8).map((s, i) => (
              <div key={`${s.id}-${i}`} className="w-[140px] shrink-0">
                <ShortsCard short={s} />
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Latest Uploads</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {latestUploads.map((u) => (
              <div key={u.title} className="overflow-hidden rounded-md">
                <div className="relative aspect-video w-full overflow-hidden">
                  <img src={img(u.thumb, 500, 300)} alt={u.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <p className="absolute bottom-2 left-2 right-2 truncate text-sm font-semibold text-text-primary">
                    {u.title}
                  </p>
                </div>
                <p className="mt-1 text-xs text-text-tertiary">{u.ago}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>

      <Footer />
    </div>
  );
}
