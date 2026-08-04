import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CardBase } from "./CardBase";
import { Badge } from "@/components/ui/Badge";
import type { PlayerStory } from "@/types/content";

export function PlayerStoryCard({ story }: { story: PlayerStory }) {
  const navigate = useNavigate();

  return (
    <CardBase onClick={() => navigate(`/player-stories/${story.id}`)}>
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img src={story.thumbnail} alt={story.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
        <div className="absolute left-2 top-2">
          <Badge kind={story.accessTier === "PREMIUM" ? "premium" : "free"}>{story.accessTier}</Badge>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-secondary">{story.category}</p>
          <p className="truncate text-base font-bold text-text-primary">{story.title}</p>
          <p className="mt-1 line-clamp-2 text-xs text-text-secondary">{story.description}</p>
          <p className="mt-2 flex items-center gap-1 text-[11px] text-text-tertiary">
            <Clock className="h-3 w-3" /> {story.duration}
          </p>
        </div>
      </div>
    </CardBase>
  );
}
