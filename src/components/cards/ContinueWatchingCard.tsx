import { Play } from "lucide-react";
import { CardBase } from "./CardBase";
import type { ContinueWatchingItem } from "@/types/content";

export function ContinueWatchingCard({ item }: { item: ContinueWatchingItem }) {
  return (
    <CardBase>
      <div className="group relative aspect-video w-full overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-cover transition duration-300 group-hover:brightness-110"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
          <Play className="h-10 w-10 fill-white text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
          <div className="h-full bg-primary" style={{ width: `${item.progressPct}%` }} />
        </div>
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-semibold text-text-primary">{item.title}</p>
        <p className="mt-0.5 truncate text-xs text-text-tertiary">{item.meta}</p>
      </div>
    </CardBase>
  );
}
