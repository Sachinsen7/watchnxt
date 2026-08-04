import type { Short } from "@/types/content";
import { img } from "./sports";

export const shorts: Short[] = [
  { id: "s-1", sport: "basketball", title: "Insane buzzer beater from the corner", duration: "0:45", category: "Highlight", likes: 45_000, views: 1_200_000, thumbnail: img("short-1", 500, 890) },
  { id: "s-2", sport: "football", title: "Unbelievable solo run through 5 defenders", duration: "0:15", category: "Trending", likes: 12_000, views: 890_000, thumbnail: img("short-2", 500, 890) },
  { id: "s-3", sport: "tennis", title: "Morning grind with the World Champ", duration: "1:02", category: "Training", likes: 8_000, views: 340_000, thumbnail: img("short-3", 500, 890) },
  { id: "s-4", sport: "tennis", title: "\"I knew it was in the moment I hit it\"", duration: "0:30", category: "Exclusive", likes: 92_000, views: 2_100_000, thumbnail: img("short-4", 500, 890) },
  { id: "s-5", sport: "basketball", title: "Final preparations before the Big Game", duration: "0:58", category: "Behind-the-Scenes", likes: 5_000, views: 120_000, thumbnail: img("short-5", 500, 890) },
  { id: "s-6", sport: "f1", title: "Physics-defying save in the final corner", duration: "0:24", category: "Viral", likes: 210_000, views: 4_500_000, thumbnail: img("short-6", 500, 890) },
];
