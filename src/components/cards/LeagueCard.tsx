import { useNavigate } from "react-router-dom";
import { CardBase } from "./CardBase";
import { Badge } from "@/components/ui/Badge";
import type { League } from "@/types/content";

export function LeagueCard({ league }: { league: League }) {
  const navigate = useNavigate();

  return (
    <CardBase onClick={() => navigate(`/leagues/${league.id}`)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img src={league.thumbnail} alt={league.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="absolute left-2 top-2">
          <Badge kind={league.status === "LIVE" ? "live" : "neutral"}>{league.status}</Badge>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-secondary">
            {league.sport}
          </p>
          <p className="truncate text-lg font-extrabold text-text-primary">{league.name}</p>
          <p className="truncate text-xs text-text-tertiary">{league.meta}</p>
        </div>
      </div>
    </CardBase>
  );
}
