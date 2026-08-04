import type { PricingPlan } from "@/types/content";
import { img } from "./sports";

export const pricingPlans: PricingPlan[] = [
  {
    id: "p-match",
    name: "Match Pass",
    price: "₹29",
    description: "Perfect for fans who want to watch one live match.",
    features: ["Access to Any 1 Live Match", "HD Streaming", "Ad-Free Experience", "Multi-Language Commentary"],
    thumbnail: img("plan-match", 500, 300),
    cta: "Buy Match Pass",
    badge: "Match Access",
  },
  {
    id: "p-tournament",
    name: "Tournament Pass",
    price: "₹199",
    description: "Watch every match of your favorite tournament.",
    features: ["One Complete Tournament", "HD Streaming", "Ad-Free Experience", "Match Replays", "Highlights Included"],
    thumbnail: img("plan-tournament", 500, 300),
    cta: "Buy Tournament Pass",
    highlight: true,
    badge: "Season Special",
  },
  {
    id: "p-monthly",
    name: "Monthly Premium",
    price: "₹149",
    period: "Month",
    description: "Unlimited premium access to everything on WatchNXT.",
    features: ["Unlimited Live Matches", "All Tournaments & Exclusives", "Ad-Free + 4K Streaming", "Up to 4 Devices"],
    thumbnail: img("plan-monthly", 500, 300),
    cta: "Go Premium",
    badge: "Most Popular",
  },
];
