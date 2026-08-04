export type SportId =
  | "cricket"
  | "football"
  | "f1"
  | "tennis"
  | "kabaddi"
  | "basketball";

export type AccessTier = "FREE" | "PREMIUM";

export interface Sport {
  id: SportId;
  name: string;
  colorVar: string;
}

export interface Team {
  name: string;
  short: string;
  logo?: string;
  colorHex?: string;
}

export type MatchStatus = "live" | "upcoming" | "scheduled";

export interface Match {
  id: string;
  sport: SportId;
  league: string;
  status: MatchStatus;
  title: string;
  teams: [Team, Team];
  scoreLine?: string;
  scoreSubLine?: string;
  venue?: string;
  startsAt: string;
  viewerCount?: number;
  tags?: string[];
  thumbnail: string;
  isPremium?: boolean;
}

export interface League {
  id: string;
  sport: SportId;
  name: string;
  meta: string;
  status: "LIVE" | "UPCOMING" | "SCHEDULED";
  thumbnail: string;
}

export type ShortCategory =
  | "Highlight"
  | "Trending"
  | "Training"
  | "Exclusive"
  | "Behind-the-Scenes"
  | "Viral";

export interface Short {
  id: string;
  sport: SportId;
  title: string;
  duration: string;
  category: ShortCategory;
  likes: number;
  views: number;
  thumbnail: string;
}

export interface Highlight {
  id: string;
  sport: SportId;
  league: string;
  title: string;
  resultLine: string;
  duration: string;
  postedAgo: string;
  thumbnail: string;
  badge?: string;
}

export interface Show {
  id: string;
  title: string;
  seasonLabel: string;
  tags: string[];
  thumbnail: string;
}

export type PlayerStoryCategory =
  | "Documentary"
  | "Biography"
  | "Interview"
  | "Locker Room"
  | "Behind The Scenes";

export interface PlayerStory {
  id: string;
  athlete: string;
  sport: SportId;
  category: PlayerStoryCategory;
  title: string;
  description: string;
  duration: string;
  accessTier: AccessTier;
  thumbnail: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  thumbnail: string;
  cta: string;
}

export interface ContinueWatchingItem {
  id: string;
  title: string;
  meta: string;
  progressPct: number;
  thumbnail: string;
}
