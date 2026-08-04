import { RevealSection } from "@/components/rails/RevealSection";
import { useParams } from "react-router-dom";
import { Play, ListPlus, Share2 } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlayerStoryCard } from "@/components/cards/PlayerStoryCard";
import { useGetPlayerStoriesQuery } from "@/store/api/contentApi";

export function PlayerStoryDetailPage() {
  const { id } = useParams();
  const { data: stories = [] } = useGetPlayerStoriesQuery();
  const story = stories.find((s) => s.id === id) ?? stories[0];

  if (!story) return null;

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 py-6 md:px-10">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          <img src={story.thumbnail} alt={story.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <Play className="h-6 w-6 fill-white text-white" />
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Badge kind={story.accessTier === "PREMIUM" ? "premium" : "free"}>{story.accessTier}</Badge>
          <span className="text-xs font-bold uppercase tracking-wide text-secondary">{story.category}</span>
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold text-text-primary">{story.title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">{story.description}</p>
        <p className="mt-2 text-xs text-text-tertiary">{story.duration} • {story.athlete}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="gradient" radius="full" className="px-6" startContent={<Play className="h-4 w-4 fill-current" />}>
            Watch Story
          </Button>
          <Button variant="flat" radius="full" className="bg-surface-raised text-text-primary" startContent={<ListPlus className="h-4 w-4" />}>
            My List
          </Button>
          <Button variant="glass-icon" aria-label="Share">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <RevealSection className="mt-10">
          <h2 className="mb-4 font-display text-xl font-bold text-text-primary">More Stories</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {stories.filter((s) => s.id !== story.id).map((s) => (
              <PlayerStoryCard key={s.id} story={s} />
            ))}
          </div>
        </RevealSection>
      </div>

      <Footer />
    </div>
  );
}
