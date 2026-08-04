import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { CardBase } from "@/components/cards/CardBase";
import { Badge } from "@/components/ui/Badge";
import { img } from "@/mocks/sports";

const sportTiles = [
  { name: "Cricket", seed: "cat-cricket" },
  { name: "Football", seed: "cat-football" },
  { name: "Badminton", seed: "cat-badminton" },
  { name: "Basketball", seed: "cat-basketball" },
  { name: "Tennis", seed: "cat-tennis" },
  { name: "Formula 1", seed: "cat-f1" },
  { name: "Kabaddi", seed: "cat-kabaddi" },
  { name: "Volleyball", seed: "cat-volleyball" },
];

const recommended = [
  { title: "The Last Run: Hamilton", meta: "Documentary • Racing", duration: "1h 45m", premium: true, seed: "rec-1" },
  { title: "90 Minutes of Magic", meta: "Match Replay • Football", duration: "2h 10m", premium: false, seed: "rec-2" },
  { title: "Forging Greatness", meta: "Original Series • Training", duration: "48m", premium: true, seed: "rec-3" },
  { title: "The Underdogs Journey", meta: "Animated • Family", duration: "1h 15m", premium: false, seed: "rec-4" },
  { title: "Wall of Steel", meta: "Documentary • Rugby", duration: "1h 55m", premium: false, seed: "rec-5" },
];

export function CategoriesPage() {
  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-6 md:px-10">
        <div className="relative overflow-hidden rounded-lg">
          <img src={img("categories-hero", 1600, 700)} alt="" className="h-[340px] w-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-4 p-8">
            <h1 className="font-display text-3xl font-extrabold text-text-primary md:text-4xl">
              Browse Categories
            </h1>
            <p className="max-w-lg text-sm text-text-secondary">
              Discover every thrill. From the roar of the stadium to the precision of the court, find your
              favorite sport now.
            </p>
            <Input
              placeholder="Search sports, tournaments, or teams..."
              startContent={<Search className="h-4 w-4 text-text-tertiary" />}
              radius="lg"
              size="lg"
              className="max-w-md"
              classNames={{
                inputWrapper: "h-14 bg-black/40 backdrop-blur",
                innerWrapper: "gap-2.5",
                input: "bg-transparent appearance-none text-base",
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-14 px-6 py-12 md:px-10">
        <section>
          <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Browse by Sport</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {sportTiles.map((s) => (
              <CardBase key={s.name} className="group">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={img(s.seed, 500, 380)}
                    alt={s.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <p className="absolute bottom-3 left-4 font-display text-lg font-bold text-text-primary">
                    {s.name}
                  </p>
                </div>
              </CardBase>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Recommended for You</h2>
          <div className="flex gap-5 overflow-x-auto pb-2">
            {recommended.map((r) => (
              <CardBase key={r.title} className="w-[200px] shrink-0">
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                  <img src={img(r.seed, 400, 600)} alt={r.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                  {r.premium && (
                    <span className="absolute right-2 top-2">
                      <Badge kind="premium">Premium</Badge>
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="text-[11px] font-semibold text-text-tertiary">{r.duration}</p>
                    <p className="mt-1 line-clamp-2 text-sm font-bold text-text-primary">{r.title}</p>
                    <p className="mt-0.5 truncate text-[11px] text-text-tertiary">{r.meta}</p>
                  </div>
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
