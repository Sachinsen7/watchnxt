import type { League } from "@/types/content";
import { img } from "./sports";

export const leagues: League[] = [
  { id: "l-1", sport: "cricket", name: "IPL", meta: "Season 2024 • 2 Live", status: "LIVE", thumbnail: img("league-ipl-cricket", 500, 500) },
  { id: "l-2", sport: "football", name: "Premier League", meta: "Matchweek 28 • 10 Matches", status: "UPCOMING", thumbnail: img("league-epl-football", 500, 500) },
  { id: "l-3", sport: "cricket", name: "ICC Cricket World Cup", meta: "T20 Series", status: "SCHEDULED", thumbnail: img("league-icc-cricket", 500, 500) },
  { id: "l-4", sport: "football", name: "Champions League", meta: "Quarter Finals • 1 Live", status: "LIVE", thumbnail: img("league-ucl-football", 500, 500) },
  { id: "l-5", sport: "football", name: "La Liga", meta: "Matchday 32 • 4 Matches", status: "UPCOMING", thumbnail: img("league-laliga-football", 500, 500) },
];
