import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Plus, Play } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { FilterPill } from "@/components/ui/FilterPill";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { Button } from "@/components/ui/Button";
import { CardBase } from "@/components/cards/CardBase";
import { ShowCard } from "@/components/cards/ShowCard";
import { Rail } from "@/components/rails/Rail";
import { useGetShowsQuery } from "@/store/api/contentApi";
import { img } from "@/mocks/sports";

const categories = ["All Shows", "Originals", "Documentaries", "Match Analysis", "Talk Shows", "Behind the Scenes", "Interviews"];

const newReleases = [
  { title: "The Final Whistle", meta: "Football • Weekly Roundup", tag: "New Episode", thumb: "new-1" },
  { title: "Under the Helmet", meta: "NFL • Documentary", tag: null, thumb: "new-2" },
  { title: "Courtside Live", meta: "Basketball • Daily Talk", tag: null, thumb: "new-3" },
  { title: "Beyond the Track", meta: "Motorsports • Lifestyle", tag: null, thumb: "new-4" },
];

export function ShowsPage() {
  const { data: shows = [] } = useGetShowsQuery();
  const [category, setCategory] = useState("All Shows");
  const hero = shows[0];

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-6 md:px-10">
        <h1 className="font-display text-2xl font-bold text-text-primary">Sports Shows</h1>
        <p className="mt-1 max-w-2xl text-sm text-text-secondary">
          Explore original series, match analysis, documentaries, interviews, behind-the-scenes content, and
          exclusive sports programming.
        </p>
      </div>

      {hero && (
        <div className="px-6 pt-6 md:px-10">
          <div className="relative overflow-hidden rounded-lg border border-white/10">
            <img src={img("show-hero", 1600, 700)} alt="" className="h-[300px] w-full object-cover md:h-[360px]" />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end gap-3 p-8">
              <span className="w-fit rounded-sm bg-tertiary px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-canvas">
                WatchNXT Original
              </span>
              <h2 className="font-display text-3xl font-extrabold text-text-primary">{hero.title}</h2>
              <p className="flex items-center gap-2 text-sm text-text-secondary">
                <Star className="h-4 w-4 fill-premium text-premium" /> 9.8 Rating • Documentary • 3 Seasons
              </p>
              <p className="max-w-xl text-sm text-text-secondary">
                An intimate journey through the life of football's greatest icon — from the streets to the
                triumphant heights of glory.
              </p>
              <div className="mt-2 flex gap-3">
                <Link to={`/shows/${hero.id}`}>
                  <Button
                    variant="flat"
                    radius="full"
                    className="bg-premium px-6 text-canvas shadow-[0_4px_20px_rgba(245,185,61,0.35)] hover:brightness-110"
                    startContent={<Play className="h-4 w-4 fill-current" />}
                  >
                    Watch Trailer
                  </Button>
                </Link>
                <Link to={`/shows/${hero.id}`}>
                  <Button variant="flat" radius="full" className="bg-white/10 px-6 text-text-primary">
                    View Show
                  </Button>
                </Link>
                <Button variant="glass-icon" aria-label="Add to My List">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 px-6 pt-6 md:px-10">
        {categories.map((c) => (
          <FilterPill key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
        ))}
      </div>

      <div className="mx-6 mt-4 flex flex-col gap-3 rounded-lg border border-white/10 bg-surface/60 p-4 md:mx-10">
        <div className="flex flex-wrap gap-3">
          <FilterSelect label="Sport" value="All Sports" />
          <FilterSelect label="Genre" value="All Genres" />
          <FilterSelect label="Language" value="English" />
        </div>
        <FilterSelect label="Sort by" value="Newest First" />
      </div>

      <div className="flex flex-col gap-14 px-6 py-10 md:px-10">
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-text-primary">Trending Shows</h2>
            <Link to="#" className="text-sm font-medium text-tertiary">
              View All &gt;
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {shows.map((s) => (
              <ShowCard key={s.id} show={s} />
            ))}
          </div>
        </section>

        <Rail title="New Releases" itemClassName="w-[240px]" alwaysShowArrows>
          {newReleases.map((r) => (
            <CardBase key={r.title}>
              <div className="relative aspect-video w-full overflow-hidden">
                <img src={img(r.thumb, 500, 300)} alt={r.title} className="h-full w-full object-cover" />
                {r.tag && (
                  <span className="absolute left-2 top-2 rounded-sm bg-primary px-1.5 py-0.5 text-[10px] font-bold text-text-on-accent">
                    {r.tag}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-semibold text-text-primary">{r.title}</p>
                <p className="truncate text-xs text-text-tertiary">{r.meta}</p>
              </div>
            </CardBase>
          ))}
        </Rail>
      </div>

      <Footer />
    </div>
  );
}
