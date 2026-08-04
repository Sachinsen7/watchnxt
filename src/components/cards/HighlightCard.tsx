import { useNavigate } from "react-router-dom";
import { CardBase } from "./CardBase";
import { Badge } from "@/components/ui/Badge";
import type { Highlight } from "@/types/content";

export function HighlightCard({ highlight }: { highlight: Highlight }) {
  const navigate = useNavigate();

  return (
    <CardBase onClick={() => navigate(`/highlights/${highlight.id}`)}>
      <div className="relative aspect-video w-full overflow-hidden">
        <img src={highlight.thumbnail} alt={highlight.title} className="h-full w-full object-cover" />
        <div className="absolute left-2 top-2 text-[11px] font-bold uppercase tracking-wide text-secondary">
          {highlight.league}
        </div>
        {highlight.badge && (
          <div className="absolute right-2 top-2">
            <Badge kind="premium">{highlight.badge}</Badge>
          </div>
        )}
        <div className="absolute bottom-2 right-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-white">
          {highlight.duration}
        </div>
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-semibold text-text-primary">{highlight.title}</p>
        <p className="mt-0.5 truncate text-xs font-medium text-primary-light">{highlight.resultLine}</p>
        <p className="mt-1 truncate text-[11px] text-text-tertiary">{highlight.postedAgo}</p>
      </div>
    </CardBase>
  );
}
