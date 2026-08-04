import { Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CardBase } from "./CardBase";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCount } from "@/lib/utils";
import type { Match } from "@/types/content";

export function LiveMatchCard({ match }: { match: Match }) {
  const navigate = useNavigate();

  return (
    <CardBase onClick={() => navigate(`/live/${match.id}`)}>
      <div className="relative aspect-video w-full overflow-hidden">
        <img src={match.thumbnail} alt={match.title} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Badge kind="live">Live</Badge>
            <span className="truncate text-[11px] font-bold uppercase tracking-wide text-white/90">
              {match.league}
            </span>
          </div>
          {match.tags?.[0] && (
            <span className="shrink-0 rounded-sm bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
              {match.tags[0]}
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-3">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-lg font-extrabold text-white">{match.scoreLine}</p>
              <p className="truncate text-xs text-white/70">{match.scoreSubLine}</p>
            </div>
            {match.viewerCount && (
              <div className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-white/70">
                <Eye className="h-3 w-3" /> {formatCount(match.viewerCount)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-bold text-text-primary">{match.title}</p>
          <div onClick={(e) => e.stopPropagation()} className="shrink-0">
            <Button variant="glass-icon" size="sm" aria-label="Add to My List">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="mt-0.5 truncate text-xs text-text-tertiary">
          {match.venue ? `${match.league} • ${match.venue}` : match.league}
        </p>

        <div onClick={(e) => e.stopPropagation()}>
          <Button
            variant="gradient"
            className="mt-3 w-full"
            startContent="▶"
            onPress={() => navigate(`/live/${match.id}/watch`)}
          >
            Watch Live
          </Button>
        </div>
      </div>
    </CardBase>
  );
}
