import { Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface PlayerMatchSummaryProps {
  thumbnail: string;
  title: string;
  meta: string;
}

export function PlayerMatchSummary({ thumbnail, title, meta }: PlayerMatchSummaryProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
      <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md">
        <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
        <div className="absolute left-1 top-1">
          <Badge kind="live" className="scale-90 origin-left">
            Live
          </Badge>
        </div>
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-text-primary">{title}</p>
        <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-text-tertiary">
          <Volume2 className="h-3.5 w-3.5 shrink-0" /> {meta}
        </p>
      </div>
    </div>
  );
}
