import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Footer } from "@/components/nav/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useGetLiveMatchesQuery, useGetHighlightsQuery, useGetShowsQuery } from "@/store/api/contentApi";

const sportLabels: Record<string, string> = {
  cricket: "Live Sports",
  football: "Live Sports",
  f1: "F1 Racing",
  tennis: "Live Sports",
  kabaddi: "Live Sports",
  basketball: "Live Sports",
};

const benefits = [
  "Unlimited Live Matches",
  "All Tournaments",
  "Shorts & Highlights",
  "Shows & Player Stories",
  "HD & 4K Streaming",
  "Ad-Free Viewing",
  "Multi-Device Access",
];

export function PaymentSuccessPage() {
  const { data: matches = [] } = useGetLiveMatchesQuery();
  const { data: highlights = [] } = useGetHighlightsQuery();
  const { data: shows = [] } = useGetShowsQuery();

  const spotlight = [
    matches[0] && {
      id: matches[0].id,
      href: `/live/${matches[0].id}`,
      title: matches[0].title,
      thumbnail: matches[0].thumbnail,
      category: sportLabels[matches[0].sport] ?? "Live Sports",
      badge: "live" as const,
    },
    highlights[0] && {
      id: highlights[0].id,
      href: `/highlights/${highlights[0].id}`,
      title: highlights[0].title,
      thumbnail: highlights[0].thumbnail,
      category: sportLabels[highlights[0].sport] ?? "Highlights",
      badge: "Highlights" as const,
    },
    shows[0] && {
      id: shows[0].id,
      href: `/shows/${shows[0].id}`,
      title: shows[0].title,
      thumbnail: shows[0].thumbnail,
      category: "Original Series",
      badge: "Premium Show" as const,
    },
  ].filter(Boolean) as {
    id: string;
    href: string;
    title: string;
    thumbnail: string;
    category: string;
    badge: "live" | "Highlights" | "Premium Show";
  }[];

  return (
    <div>
      <div className="flex flex-col items-center px-6 pt-16 text-center md:px-10">
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-brand shadow-glow-violet"
        >
          <Check className="h-9 w-9 text-white" />
        </motion.span>
        <h1 className="font-display text-3xl font-extrabold text-text-primary">🎉 Payment Successful!</h1>
        <p className="mt-2 max-w-md text-sm text-text-secondary">
          Welcome to WatchNXT Premium. Your subscription has been activated instantly.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 items-start gap-6 px-6 md:grid-cols-2 md:px-10">
        <div className="rounded-lg bg-surface p-6">
          <h2 className="font-display text-lg font-bold text-text-primary">Purchase Summary</h2>
          <div className="mt-3 border-t border-white/10" />
          <div className="mt-5 grid grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-[10px] font-bold uppercase text-text-tertiary">Plan</p>
              <p className="mt-1 font-semibold text-secondary">Monthly Premium</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-text-tertiary">Amount Paid</p>
              <p className="mt-1 font-semibold text-text-primary">₹149</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-text-tertiary">Payment Method</p>
              <p className="mt-1 font-semibold text-text-primary">UPI / Card</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-text-tertiary">Transaction ID</p>
              <p className="mt-1 font-semibold text-text-primary">TXN-9981-A2B3</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-text-tertiary">Date &amp; Time</p>
              <p className="mt-1 font-semibold text-text-primary">
                {new Date().toLocaleDateString()}, {new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-text-tertiary">Next Renewal</p>
              <p className="mt-1 font-semibold text-primary">
                {new Date(Date.now() + 30 * 86400000).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/" className="flex-1">
                <Button variant="gradient" radius="md" className="w-full" startContent="▶">
                  Start Watching
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button
                  variant="flat"
                  radius="md"
                  className="w-full border border-white/20 bg-transparent text-text-primary hover:bg-white/5"
                >
                  Go to Homepage
                </Button>
              </Link>
            </div>
            <Link to="/settings" className="text-center text-sm text-text-tertiary underline">
              View Subscription Details
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-surface p-6">
          <h2 className="font-display text-lg font-bold text-text-primary">Benefits Unlocked</h2>
          <div className="mt-3 border-t border-white/10" />
          <ul className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-text-secondary">
                <Check className="h-4 w-4 shrink-0 text-secondary" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-text-primary">Start Watching Now</h2>
            <Link to="/live" className="text-sm font-medium text-tertiary">
              View All &gt;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {spotlight.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className="group relative aspect-video overflow-hidden rounded-xl border border-white/10"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />
                <span className="absolute left-3 top-3">
                  {item.badge === "live" ? (
                    <Badge kind="live">Live</Badge>
                  ) : (
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {item.badge}
                    </span>
                  )}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm font-semibold text-secondary">{item.category}</p>
                  <p className="mt-1 truncate font-display text-xl font-bold text-white">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
