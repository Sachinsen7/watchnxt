import type { Sport } from "@/types/content";
import { resolveRealImage } from "./realImages";

export const sports: Sport[] = [
  { id: "cricket", name: "Cricket", colorVar: "var(--sport-cricket)" },
  { id: "football", name: "Football", colorVar: "var(--sport-football)" },
  { id: "f1", name: "Formula 1", colorVar: "var(--sport-f1)" },
  { id: "tennis", name: "Tennis", colorVar: "var(--sport-tennis)" },
  { id: "kabaddi", name: "Kabaddi", colorVar: "var(--sport-kabaddi)" },
  { id: "basketball", name: "Basketball", colorVar: "var(--sport-basketball)" },
];

/** Real, self-hosted sport/athlete photography, keyed off the descriptive seed. */
export function img(seed: string, _w = 800, _h = 450) {
  return resolveRealImage(seed);
}
