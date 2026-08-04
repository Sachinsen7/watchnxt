import type { SportId } from "@/types/content";

/**
 * Real sport/athlete photography, self-hosted in public/images — avoids any
 * dependency on external CDN reachability (Wikimedia was DNS-blocked on this
 * network; these files are served same-origin by Vite instead).
 */

export const sportPhotos: Record<SportId, string[]> = {
  cricket: ["/images/sports/cricket-1.jpg", "/images/sports/cricket-2.jpg", "/images/sports/cricket-hero.jpg"],
  football: ["/images/sports/football-1.jpg", "/images/sports/football-2.jpg"],
  f1: ["/images/sports/f1-1.jpg", "/images/sports/f1-hero.jpg"],
  tennis: ["/images/sports/tennis-1.jpg"],
  kabaddi: ["/images/sports/kabaddi-1.jpg"],
  basketball: ["/images/sports/basketball-1.jpg"],
};

/** Real photos of the named real athletes used across mock content. */
export const athletePhotos: Record<string, string> = {
  "virat kohli": "/images/athletes/virat-kohli.jpg",
  "ms dhoni": "/images/athletes/ms-dhoni.jpg",
  "rohit sharma": "/images/athletes/rohit-sharma.jpg",
  "sachin tendulkar": "/images/athletes/sachin-tendulkar.jpg",
  "jasprit bumrah": "/images/athletes/jasprit-bumrah.jpg",
  "lionel messi": "/images/athletes/lionel-messi.jpg",
  "cristiano ronaldo": "/images/athletes/cristiano-ronaldo.jpg",
  "lewis hamilton": "/images/athletes/lewis-hamilton.jpg",
};

const athletePool = Object.values(athletePhotos);

/** Generic real venue/crowd photography for banners not tied to one sport. */
const venuePhotos = ["/images/sports/venue-1.jpg", "/images/sports/venue-2.jpg"];

function hash(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

function pick(pool: string[], seed: string) {
  return pool[hash(seed) % pool.length];
}

/**
 * Smart real-image resolver — routes to real, self-hosted sport/athlete
 * photography based on keywords in the seed.
 */
export function resolveRealImage(seed: string): string {
  const s = seed.toLowerCase();

  if (s.includes("cricket")) return pick(sportPhotos.cricket, seed);
  if (s.includes("football") || s.includes("soccer")) return pick(sportPhotos.football, seed);
  if (s.includes("f1") || s.includes("formula")) return pick(sportPhotos.f1, seed);
  if (s.includes("tennis")) return pick(sportPhotos.tennis, seed);
  if (s.includes("kabaddi")) return pick(sportPhotos.kabaddi, seed);
  if (s.includes("basketball") || s.includes("nba")) return pick(sportPhotos.basketball, seed);

  if (s.includes("avatar") || s.includes("profile") || s.includes("player") || s.includes("moment")) {
    return pick(athletePool, seed);
  }

  return pick(venuePhotos, seed);
}
