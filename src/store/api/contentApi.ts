import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { heroMatch, liveMatches, upcomingMatches } from "@/mocks/matches";
import { leagues } from "@/mocks/leagues";
import { shorts } from "@/mocks/shorts";
import { highlights } from "@/mocks/highlights";
import { shows } from "@/mocks/shows";
import { playerStories } from "@/mocks/playerStories";
import { pricingPlans } from "@/mocks/pricing";
import { continueWatching } from "@/mocks/continueWatching";
import type {
  Match,
  League,
  Short,
  Highlight,
  Show,
  PlayerStory,
  PricingPlan,
  ContinueWatchingItem,
} from "@/types/content";

/**
 * No backend yet. `fakeBaseQuery` keeps every endpoint on the real RTK Query
 * cache/tag/polling machinery so swapping in a real `fetchBaseQuery` later is
 * a one-line change per endpoint, not a rewrite of the components consuming them.
 */
const delay = <T>(data: T, ms = 250) =>
  new Promise<{ data: T }>((resolve) => setTimeout(() => resolve({ data }), ms));

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Match", "League", "Short", "Highlight", "Show", "PlayerStory", "Plan", "ContinueWatching"],
  endpoints: (builder) => ({
    getHeroMatch: builder.query<Match, void>({
      queryFn: () => delay(heroMatch),
      providesTags: ["Match"],
    }),
    getLiveMatches: builder.query<Match[], void>({
      queryFn: () => delay(liveMatches),
      providesTags: ["Match"],
    }),
    getUpcomingMatches: builder.query<Match[], void>({
      queryFn: () => delay(upcomingMatches),
      providesTags: ["Match"],
    }),
    getLeagues: builder.query<League[], void>({
      queryFn: () => delay(leagues),
      providesTags: ["League"],
    }),
    getShorts: builder.query<Short[], void>({
      queryFn: () => delay(shorts),
      providesTags: ["Short"],
    }),
    getHighlights: builder.query<Highlight[], void>({
      queryFn: () => delay(highlights),
      providesTags: ["Highlight"],
    }),
    getShows: builder.query<Show[], void>({
      queryFn: () => delay(shows),
      providesTags: ["Show"],
    }),
    getPlayerStories: builder.query<PlayerStory[], void>({
      queryFn: () => delay(playerStories),
      providesTags: ["PlayerStory"],
    }),
    getPricingPlans: builder.query<PricingPlan[], void>({
      queryFn: () => delay(pricingPlans),
      providesTags: ["Plan"],
    }),
    getContinueWatching: builder.query<ContinueWatchingItem[], void>({
      queryFn: () => delay(continueWatching),
      providesTags: ["ContinueWatching"],
    }),
  }),
});

export const {
  useGetHeroMatchQuery,
  useGetLiveMatchesQuery,
  useGetUpcomingMatchesQuery,
  useGetLeaguesQuery,
  useGetShortsQuery,
  useGetHighlightsQuery,
  useGetShowsQuery,
  useGetPlayerStoriesQuery,
  useGetPricingPlansQuery,
  useGetContinueWatchingQuery,
} = contentApi;
