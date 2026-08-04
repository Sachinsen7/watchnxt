import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { ComingSoonPage } from "./ComingSoonPage";
import { LoginPage } from "@/features/auth/LoginPage";
import { OtpPage } from "@/features/auth/OtpPage";
import { HomePage } from "@/features/home/HomePage";
import { LiveListingPage } from "@/features/live/LiveListingPage";
import { LiveMatchDetailPage } from "@/features/live/LiveMatchDetailPage";
import { LiveMatchPlayerPage } from "@/features/live/LiveMatchPlayerPage";
import { UpcomingMatchesPage } from "@/features/upcoming/UpcomingMatchesPage";
import { UpcomingMatchDetailPage } from "@/features/upcoming/UpcomingMatchDetailPage";
import { PopularLeaguesPage } from "@/features/leagues/PopularLeaguesPage";
import { LeagueDetailPage } from "@/features/leagues/LeagueDetailPage";
import { ShortsPage } from "@/features/shorts/ShortsPage";
import { ShortsFeedPage } from "@/features/shorts/ShortsFeedPage";
import { HighlightsPage } from "@/features/highlights/HighlightsPage";
import { HighlightDetailPage } from "@/features/highlights/HighlightDetailPage";
import { ShowsPage } from "@/features/shows/ShowsPage";
import { ShowDetailPage } from "@/features/shows/ShowDetailPage";
import { PlayerStoriesPage } from "@/features/playerStories/PlayerStoriesPage";
import { PlayerStoryDetailPage } from "@/features/playerStories/PlayerStoryDetailPage";
import { PremiumPaywallPage } from "@/features/premium/PremiumPaywallPage";
import { CheckoutPage } from "@/features/premium/CheckoutPage";
import { PaymentSuccessPage } from "@/features/premium/PaymentSuccessPage";
import { PaymentFailedPage } from "@/features/premium/PaymentFailedPage";
import { SearchResultsPage } from "@/features/search/SearchResultsPage";
import { MyListPage } from "@/features/account/MyListPage";
import { ProfilePage } from "@/features/account/ProfilePage";
import { SettingsPage } from "@/features/account/SettingsPage";
import { CategoriesPage } from "@/features/categories/CategoriesPage";
import { NotificationsPage } from "@/features/notifications/NotificationsPage";
import { SupportCenterPage } from "@/features/support/SupportCenterPage";
import { RaiseTicketPage } from "@/features/support/RaiseTicketPage";
import { MyTicketsPage } from "@/features/support/MyTicketsPage";
import { LiveChatPage } from "@/features/support/LiveChatPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/otp", element: <OtpPage /> },
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/live", element: <LiveListingPage /> },
      { path: "/live/:id", element: <LiveMatchDetailPage /> },
      { path: "/live/:id/watch", element: <LiveMatchPlayerPage /> },
      { path: "/upcoming", element: <UpcomingMatchesPage /> },
      { path: "/upcoming/:id", element: <UpcomingMatchDetailPage /> },
      { path: "/leagues", element: <PopularLeaguesPage /> },
      { path: "/leagues/:id", element: <LeagueDetailPage /> },
      { path: "/shorts", element: <ShortsPage /> },
      { path: "/shorts/:id", element: <ShortsFeedPage /> },
      { path: "/highlights", element: <HighlightsPage /> },
      { path: "/highlights/:id", element: <HighlightDetailPage /> },
      { path: "/shows", element: <ShowsPage /> },
      { path: "/shows/:id", element: <ShowDetailPage /> },
      { path: "/player-stories", element: <PlayerStoriesPage /> },
      { path: "/player-stories/:id", element: <PlayerStoryDetailPage /> },
      { path: "/premium", element: <PremiumPaywallPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/payment/success", element: <PaymentSuccessPage /> },
      { path: "/payment/failed", element: <PaymentFailedPage /> },
      { path: "/search", element: <SearchResultsPage /> },
      { path: "/my-list", element: <MyListPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/categories", element: <CategoriesPage /> },
      { path: "/notifications", element: <NotificationsPage /> },
      { path: "/support", element: <SupportCenterPage /> },
      { path: "/support/raise-ticket", element: <RaiseTicketPage /> },
      { path: "/support/tickets", element: <MyTicketsPage /> },
      { path: "/support/chat", element: <LiveChatPage /> },
      { path: "*", element: <ComingSoonPage title="404 — Page Not Found" /> },
    ],
  },
]);
