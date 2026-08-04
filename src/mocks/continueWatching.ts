import type { ContinueWatchingItem } from "@/types/content";
import { img } from "./sports";

export const continueWatching: ContinueWatchingItem[] = [
  { id: "cw-1", title: "Champions League: Madrid vs Paris", meta: "Round of 16 • 15:42 left", progressPct: 62, thumbnail: img("cw-1-football", 800, 450) },
  { id: "cw-2", title: "Singapore GP: Main Race", meta: "Season 24 • Ep 12", progressPct: 38, thumbnail: img("cw-2-f1", 800, 450) },
  { id: "cw-3", title: "NBA Finals: G6 Lakers vs Celtics", meta: "Live Recording • 2h 45m", progressPct: 81, thumbnail: img("cw-3-basketball", 800, 450) },
];
