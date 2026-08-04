import type { Show } from "@/types/content";
import { img } from "./sports";

export const shows: Show[] = [
  { id: "sh-1", title: "Beyond the Boundary", seasonLabel: "S2 • 12 Episodes", tags: ["PREMIUM", "HD"], thumbnail: img("show-1", 600, 800) },
  { id: "sh-2", title: "Inside the Dressing Room", seasonLabel: "S1 • 8 Episodes", tags: ["HD"], thumbnail: img("show-2", 600, 800) },
  { id: "sh-3", title: "Legends Uncovered", seasonLabel: "Original • 24 Episodes", tags: ["PREMIUM", "HD"], thumbnail: img("show-3", 600, 800) },
  { id: "sh-4", title: "Tactical Breakdown", seasonLabel: "S3 • Weekly", tags: ["HD"], thumbnail: img("show-4", 600, 800) },
];
