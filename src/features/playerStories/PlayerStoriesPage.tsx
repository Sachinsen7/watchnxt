import { RevealSection } from "@/components/rails/RevealSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Headphones, Share2, Clock } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { Button } from "@/components/ui/Button";
import { CardBase } from "@/components/cards/CardBase";
import { Rail } from "@/components/rails/Rail";
import { useGetPlayerStoriesQuery } from "@/store/api/contentApi";
import { img } from "@/mocks/sports";
import type { PlayerStory } from "@/types/content";

const filters = ["Trending", "Legends", "Rising Stars", "Exclusive", "Origins", "Championship Mentality"];

const legends = [
  { title: "Michael Jordan: The Last Stand", desc: "Relive the 1998 championship run that defined a legacy forever.", thumb: "legend-1" },
  { title: "Tendulkar: God of Cricket", desc: "The master blaster's journey from Mumbai streets to world domination.", thumb: "legend-2" },
];

function StoryGridCard({
  story,
  variant = "trending",
  tall,
}: {
  story: PlayerStory;
  variant?: "trending" | "all";
  tall?: boolean;
}) {
  return (
    <Link to={`/player-stories/${story.id}`}>
      <CardBase>
        <div className={`relative w-full overflow-hidden ${tall ? "aspect-[3/4]" : "aspect-video"}`}>
          <img src={story.thumbnail} alt={story.title} className="h-full w-full object-cover" />
          <div
            className={`absolute flex items-center gap-1 rounded-sm bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-white ${
              variant === "trending" ? "right-2 top-2" : "bottom-2 right-2"
            }`}
          >
            {variant === "trending" && <Clock className="h-3 w-3" />} {story.duration}
          </div>
        </div>
        <div className="p-3">
          <p className="truncate text-sm font-semibold text-text-primary">{story.title}</p>
          <p className="mt-0.5 truncate text-xs text-text-tertiary">
            {variant === "trending" ? `${story.category} • 2024` : `${story.athlete} • ${story.category}`}
          </p>
        </div>
      </CardBase>
    </Link>
  );
}

export function PlayerStoriesPage() {
  const { data: stories = [] } = useGetPlayerStoriesQuery();
  const [filter, setFilter] = useState("Trending");
  const hero = stories[3];

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-6 md:px-10">
        <h1 className="font-display text-2xl font-bold text-text-primary">Player Stories</h1>
        <p className="mt-1 max-w-2xl text-sm text-text-secondary">
          Explore inspiring journeys, career milestones, and the human side of sports icons.
        </p>
      </div>

      {hero && (
        <div className="px-6 pt-6 md:px-10">
          <div className="relative overflow-hidden rounded-lg border border-white/10">
            <img src={img("story-hero", 1600, 700)} alt="" className="h-[300px] w-full object-cover md:h-[360px]" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end gap-3 p-8">
              <span className="w-fit rounded-sm bg-premium px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-canvas">
                Exclusive Story
              </span>
              <h2 className="max-w-2xl font-display text-3xl font-extrabold text-text-primary">
                Beyond the Finish Line: {hero.athlete}'s New Chapter
              </h2>
              <p className="max-w-xl text-sm text-text-secondary">{hero.description}</p>
              <div className="mt-2 flex gap-3">
                <Link to={`/player-stories/${hero.id}`}>
                  <Button
                    variant="flat"
                    radius="full"
                    className="bg-premium px-6 text-canvas shadow-[0_4px_20px_rgba(245,185,61,0.35)] hover:brightness-110"
                    startContent={<Play className="h-4 w-4 fill-current" />}
                  >
                    Watch Story
                  </Button>
                </Link>
                <Button
                  variant="flat"
                  radius="full"
                  className="bg-white/10 px-6 text-text-primary"
                  startContent={<Headphones className="h-4 w-4" />}
                >
                  My List
                </Button>
                <Button variant="glass-icon" aria-label="Share">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-6 mt-6 flex flex-col gap-3 rounded-lg border border-white/10 bg-surface/60 p-4 md:mx-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="shrink-0 text-sm text-text-tertiary">Filter by:</span>
          <FilterSelect label="Sport" value="All Sports" />
          <FilterSelect label="League" value="All Leagues" />
          <FilterSelect label="Type" value="Any Type" />
        </div>
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
      </div>

      <div className="flex flex-col gap-14 px-6 py-10 md:px-10">
        <RevealSection>
          <div className="mb-1 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-text-primary">Trending Stories</h2>
            <Link to="#" className="text-sm font-medium text-tertiary">
              View All &gt;
            </Link>
          </div>
          <p className="mb-5 text-sm text-text-secondary">The most watched player features this week</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stories.slice(0, 4).map((s) => (
              <StoryGridCard key={s.id} story={s} tall />
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Legends Collection</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {legends.map((l) => (
              <div key={l.title} className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10">
                <img src={img(l.thumb, 900, 500)} alt={l.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-y-0 left-0 flex max-w-xs flex-col justify-center gap-2 p-6">
                  <p className="font-display text-xl font-extrabold text-text-primary">{l.title}</p>
                  <p className="text-sm text-text-secondary">{l.desc}</p>
                  <span className="mt-1 text-sm font-semibold text-tertiary">Explore Legend &gt;</span>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <Rail title="All Stories" itemClassName="w-[300px]" alwaysShowArrows>
          {stories.map((s) => (
            <StoryGridCard key={`all-${s.id}`} story={s} variant="all" />
          ))}
        </Rail>
      </div>

      <Footer />
    </div>
  );
}
