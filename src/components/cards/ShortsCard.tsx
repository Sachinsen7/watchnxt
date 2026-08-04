import { Heart, Eye, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CardBase } from "./CardBase";
import { Badge } from "@/components/ui/Badge";
import { formatCount } from "@/lib/utils";
import type { Short } from "@/types/content";

const categoryKind: Record<Short["category"], "live" | "premium" | "neutral" | "sport"> = {
  Highlight: "premium",
  Trending: "sport",
  Training: "neutral",
  Exclusive: "sport",
  "Behind-the-Scenes": "neutral",
  Viral: "sport",
};

export function ShortsCard({ short }: { short: Short }) {
  const navigate = useNavigate();

  return (
    <CardBase onClick={() => navigate(`/shorts/${short.id}`)}>
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        <img src={short.thumbnail} alt={short.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
        <div className="absolute left-2 top-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-white">
          {short.duration}
        </div>
        <div className="absolute right-2 top-2">
          <Badge kind={categoryKind[short.category]}>{short.category}</Badge>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="line-clamp-2 text-sm font-semibold text-text-primary">{short.title}</p>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-text-tertiary">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" /> {formatCount(short.views)}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" /> {formatCount(short.likes)}
            </span>
            <Share2 className="ml-auto h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </CardBase>
  );
}
