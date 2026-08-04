import { useState } from "react";
import { FaGem } from "react-icons/fa6";
import { HeroBanner } from "@/components/cards/HeroBanner";
import { Rail } from "@/components/rails/Rail";
import { RevealSection } from "@/components/rails/RevealSection";
import { ContinueWatchingCard } from "@/components/cards/ContinueWatchingCard";
import { LiveMatchCard } from "@/components/cards/LiveMatchCard";
import { UpcomingMatchCard } from "@/components/cards/UpcomingMatchCard";
import { LeagueCard } from "@/components/cards/LeagueCard";
import { TrendingPosterCard } from "@/components/cards/TrendingPosterCard";
import { ShortsCard } from "@/components/cards/ShortsCard";
import { HighlightCard } from "@/components/cards/HighlightCard";
import { ShowCard } from "@/components/cards/ShowCard";
import { PlayerStoryCard } from "@/components/cards/PlayerStoryCard";
import { PricingCard } from "@/components/cards/PricingCard";
import { FilterPill } from "@/components/ui/FilterPill";
import { Footer } from "@/components/nav/Footer";

import { useGetHeroMatchQuery, useGetLiveMatchesQuery, useGetUpcomingMatchesQuery, useGetLeaguesQuery, useGetShortsQuery, useGetHighlightsQuery, useGetShowsQuery, useGetPlayerStoriesQuery, useGetPricingPlansQuery, useGetContinueWatchingQuery } from "@/store/api/contentApi";

const highlightFilters = ["All", "Cricket", "Football", "Formula 1", "Tennis", "Kabaddi"];
const storyFilters = ["All", "Cricket", "Football", "Motorsport", "Athletics", "Exclusive"];

export function HomePage() {
  const { data: hero } = useGetHeroMatchQuery();
  const { data: continueWatching = [] } = useGetContinueWatchingQuery();
  const { data: liveMatches = [] } = useGetLiveMatchesQuery();
  const { data: upcomingMatches = [] } = useGetUpcomingMatchesQuery();
  const { data: leagues = [] } = useGetLeaguesQuery();
  const { data: shorts = [] } = useGetShortsQuery();
  const { data: highlights = [] } = useGetHighlightsQuery();
  const { data: shows = [] } = useGetShowsQuery();
  const { data: playerStories = [] } = useGetPlayerStoriesQuery();
  const { data: pricingPlans = [] } = useGetPricingPlansQuery();

  const [highlightFilter, setHighlightFilter] = useState("All");
  const [storyFilter, setStoryFilter] = useState("All");

  return (
    <div>
      {hero && <HeroBanner match={hero} variant="fullbleed" />}

      <div className="flex flex-col gap-14 px-6 py-12 md:px-10">
        {continueWatching.length > 0 && (
          <Rail title="Continue Watching" subtitle="Resume from where you left off" viewAllHref="/my-list" itemClassName="w-[300px]">
            {continueWatching.map((item) => (
              <ContinueWatchingCard key={item.id} item={item} />
            ))}
          </Rail>
        )}

        <Rail title="Live Now" subtitle="Watch live sports happening right now." viewAllHref="/live" itemClassName="w-[320px]">
          {liveMatches.map((m) => (
            <LiveMatchCard key={m.id} match={m} />
          ))}
        </Rail>

        <Rail
          title="Upcoming Matches"
          subtitle="Never miss an upcoming game. Stay updated with upcoming fixtures and tournaments."
          viewAllHref="/upcoming"
          itemClassName="w-[300px]"
        >
          {upcomingMatches.map((m) => (
            <UpcomingMatchCard key={m.id} match={m} />
          ))}
        </Rail>

        <Rail title="Popular Leagues" subtitle="Explore the world's biggest sports leagues and tournaments." viewAllHref="/leagues" itemClassName="w-[220px]">
          {leagues.map((l) => (
            <LeagueCard key={l.id} league={l} />
          ))}
        </Rail>

        <Rail title="Trending Now" subtitle="Explore the Trending Content on WatchNXT" viewAllHref="/highlights" itemClassName="w-[220px]">
          {shows.slice(0, 4).map((s, i) => (
            <TrendingPosterCard key={s.id} rank={i + 1} title={s.title} thumbnail={s.thumbnail} />
          ))}
        </Rail>

        <Rail title="Shorts" subtitle="Watch bite-sized sports moments, trending clips, behind-the-scenes action, and viral highlights." viewAllHref="/shorts" itemClassName="w-[220px]">
          {shorts.map((s) => (
            <ShortsCard key={s.id} short={s} />
          ))}
        </Rail>

        <RevealSection>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-text-primary md:text-[28px]">Match Highlights</h2>
              <p className="mt-1 text-sm text-text-secondary">Relive the biggest moments, unforgettable finishes, and game-changing plays from recent matches.</p>
            </div>
          </div>
          <div className="mb-5 flex flex-wrap gap-2">
            {highlightFilters.map((f) => (
              <FilterPill key={f} label={f} active={highlightFilter === f} onClick={() => setHighlightFilter(f)} />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <HighlightCard key={h.id} highlight={h} />
            ))}
          </div>
        </RevealSection>

        <Rail title="Shows" subtitle="Explore exclusive sports originals, documentaries, analysis shows, interviews, and behind-the-scenes series." viewAllHref="/shows" itemClassName="w-[220px]">
          {shows.map((s) => (
            <ShowCard key={s.id} show={s} />
          ))}
        </Rail>

        <RevealSection>
          <div className="mb-5">
            <h2 className="font-display text-2xl font-bold text-text-primary md:text-[28px]">Player Stories</h2>
            <p className="mt-1 text-sm text-text-secondary">Go beyond the game with exclusive athlete journeys, inspiring documentaries, locker room access, and behind-the-scenes stories.</p>
          </div>
          <div className="mb-5 flex flex-wrap gap-2">
            {storyFilters.map((f) => (
              <FilterPill key={f} label={f} active={storyFilter === f} onClick={() => setStoryFilter(f)} />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {playerStories.map((s) => (
              <PlayerStoryCard key={s.id} story={s} />
            ))}
          </div>
        </RevealSection>

        <RevealSection className="rounded-lg bg-gradient-page-bg py-10 text-center">
          <h2 className="flex items-center justify-center gap-2.5 font-display text-3xl font-bold text-text-primary">
            <FaGem className="h-6 w-6 text-secondary" /> WatchNXT Premium
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-text-secondary">
            Choose the perfect plan and enjoy uninterrupted sports streaming in stunning HD with an
            ad-free experience.
          </p>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 items-start gap-6 px-6 md:grid-cols-3">
            {pricingPlans.map((p) => (
              <PricingCard key={p.id} plan={p} />
            ))}
          </div>
        </RevealSection>
      </div>

      <Footer />
    </div>
  );
}
