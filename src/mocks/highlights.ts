import type { Highlight } from "@/types/content";
import { img } from "./sports";

export const highlights: Highlight[] = [
  { id: "h-1", sport: "cricket", league: "ICC World Cup", title: "India vs Australia — Match Highlights", resultLine: "IND wins by 4 runs", duration: "12:45", postedAgo: "2 Hours Ago", badge: "EXTENDED", thumbnail: img("hl-1", 800, 450) },
  { id: "h-2", sport: "football", league: "Premier League", title: "Man City vs Arsenal — Title Decider", resultLine: "MCI 2 - 2 ARS (Full Time)", duration: "08:20", postedAgo: "5 Hours Ago", badge: "BEST MOMENTS", thumbnail: img("hl-2", 800, 450) },
  { id: "h-3", sport: "f1", league: "Monaco GP", title: "Race Rewind: Chaos in Monaco", resultLine: "Verstappen takes the win", duration: "15:10", postedAgo: "10 Hours Ago", badge: "EXTENDED", thumbnail: img("hl-3", 800, 450) },
  { id: "h-4", sport: "tennis", league: "French Open", title: "Alcaraz vs Djokovic", resultLine: "Epic 5-set Thriller", duration: "18:32", postedAgo: "1 Day Ago", thumbnail: img("hl-4", 800, 450) },
];
