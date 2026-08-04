import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { CardBase } from "./CardBase";
import { Badge } from "@/components/ui/Badge";
import type { Show } from "@/types/content";

function seededHash(id: string) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 1000;
  return h;
}

export function ShowCard({ show }: { show: Show }) {
  const navigate = useNavigate();
  const hash = seededHash(show.id);
  const rating = (8 + (hash % 20) / 10).toFixed(1);
  const matchPct = 60 + (hash % 40);

  return (
    <CardBase onClick={() => navigate(`/shows/${show.id}`)}>
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img src={show.thumbnail} alt={show.title} className="h-full w-full object-cover" />
        <div className="absolute left-2 top-2 flex gap-1.5">
          {show.tags.map((t) => (
            <Badge key={t} kind={t === "PREMIUM" ? "premium" : "hd"}>
              {t}
            </Badge>
          ))}
        </div>
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-bold text-text-primary">{show.title}</p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-xs text-text-tertiary">{show.seasonLabel}</p>
          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-premium">
            <Star className="h-3 w-3 fill-premium" /> {rating}
          </span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#EEDBFF]" style={{ width: `${matchPct}%` }} />
        </div>
      </div>
    </CardBase>
  );
}
