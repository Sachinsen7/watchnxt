import { RevealSection } from "@/components/rails/RevealSection";
import { Link } from "react-router-dom";
import { Pencil, Share2, Bell, MessageSquare, ShieldCheck, Settings, Wallet, History, Clock, Ticket, Film } from "lucide-react";
import { TrophyIcon } from "@heroicons/react/24/solid";
import { FaFutbol, FaBasketball, FaFlagCheckered } from "react-icons/fa6";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Button } from "@/components/ui/Button";
import { useAppSelector } from "@/store/hooks";

const stats: [string, string, string][] = [
  ["Subscription", "Monthly", "text-secondary"],
  ["Renewal", "15 Jan '25", "text-text-primary"],
  ["Watch Time", "482 hrs", "text-tertiary"],
  ["Fav Sport", "Cricket", "text-premium"],
  ["Saved", "24 items", "text-text-primary"],
];

const recentActivity = [
  { title: "Border-Gavaskar Trophy: India vs Australia", meta: "Match Day 3 Highlights • 12 mins left", progress: 82, thumb: "activity-1", color: "bg-secondary" },
  { title: "PL: Arsenal vs Man City", meta: "Full Replay • 45 mins left", progress: 55, thumb: "activity-2", color: "bg-tertiary" },
];

const reminders = [
  { date: "DEC 12", title: "IPL Auction 2025", meta: "Starts at 14:00 GMT" },
  { date: "DEC 15", title: "F1: Abu Dhabi Grand Prix", meta: "Final Race • Live" },
];

const updates = [
  { title: "New 'Inside the NBA' episode", meta: "2 hours ago" },
  { title: "Subscription renewal successful", meta: "Yesterday" },
  { title: "Watch History sync complete", meta: "2 days ago" },
];

const quickActions = [
  { icon: Settings, label: "Settings", to: "/settings" },
  { icon: Wallet, label: "Subscription", to: "/premium" },
  { icon: History, label: "History", to: "/my-list" },
];

const favoriteLeagues = [
  { icon: FaFutbol, label: "Premier League", color: "text-secondary", ring: "ring-secondary/40" },
  { icon: FaBasketball, label: "NBA", color: "text-tertiary", ring: "ring-tertiary/40" },
  { icon: FaFlagCheckered, label: "F1", color: "text-premium", ring: "ring-premium/40" },
];

const favoriteTeams = [
  { code: "MI", name: "Mumbai Indians", color: "bg-secondary-muted" },
  { code: "AFC", name: "Arsenal FC", color: "bg-danger" },
];

export function ProfilePage() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="flex flex-col gap-8 px-6 py-8 md:px-10">
        <div className="flex flex-col items-center gap-6 rounded-lg border border-white/10 bg-surface p-8 shadow-lg shadow-black/40 sm:flex-row sm:items-center">
          <div className="relative h-24 w-24 shrink-0">
            <div className="h-full w-full rounded-full bg-gradient-brand p-1">
              <img
                src="https://picsum.photos/seed/profile-avatar/200/200"
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-sm bg-premium px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-canvas">
              Pro
            </span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-display text-2xl font-bold text-text-primary">{user?.name ?? "Alex Morgan"}</h1>
            <p className="mt-1 text-sm text-text-tertiary">alex.rivera@watchnxt.com</p>
            <div className="mt-3 flex justify-center gap-3 sm:justify-start">
              <Button
                variant="flat"
                radius="full"
                className="bg-premium text-canvas shadow-[0_4px_20px_rgba(245,185,61,0.35)] hover:brightness-110"
                startContent={<Pencil className="h-3.5 w-3.5" />}
              >
                Edit Profile
              </Button>
              <Button variant="flat" radius="full" className="bg-surface-raised text-text-primary" startContent={<Share2 className="h-3.5 w-3.5" />}>
                Share Profile
              </Button>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-[11px] font-bold uppercase tracking-wide text-text-tertiary">Fan Loyalty</p>
            <p className="flex items-center justify-center gap-1.5 font-display text-lg font-extrabold text-secondary sm:justify-end">
              Diamond Tier <TrophyIcon className="h-4 w-4 text-premium" />
            </p>
            <p className="text-xs text-text-tertiary">Joined January 2023</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {stats.map(([l, v, color]) => (
            <div key={l} className="rounded-md border border-white/10 bg-surface p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wide text-text-tertiary">{l}</p>
              <p className={`mt-1 font-display text-lg font-extrabold ${color}`}>{v}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-10">
            <RevealSection>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-text-primary">Recent Activity</h2>
                <button className="text-sm font-medium text-tertiary">View History</button>
              </div>
              <div className="flex flex-col gap-4">
                {recentActivity.map((a) => (
                  <div key={a.title} className="flex items-center gap-4 rounded-md border border-white/10 bg-surface p-4">
                    <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md">
                      <img src={`https://picsum.photos/seed/${a.thumb}/300/180`} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-text-primary">{a.title}</p>
                      <p className="text-xs text-text-tertiary">{a.meta}</p>
                      <div className="mt-2 h-1 rounded-full bg-white/10">
                        <div className={`h-full rounded-full ${a.color}`} style={{ width: `${a.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>

            <RevealSection className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h2 className="mb-4 font-display text-xl font-bold text-text-primary">Favorite Leagues</h2>
                <div className="flex gap-3">
                  {favoriteLeagues.map((l) => (
                    <div
                      key={l.label}
                      title={l.label}
                      className={`flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full border border-white/10 bg-surface ring-1 ${l.ring}`}
                    >
                      <l.icon className={`h-5 w-5 ${l.color}`} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="mb-4 font-display text-xl font-bold text-text-primary">Favorite Teams</h2>
                <div className="flex gap-3">
                  {favoriteTeams.map((t) => (
                    <div key={t.code} className="flex items-center gap-2 rounded-md border border-white/10 bg-surface py-3 pl-3 pr-4">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${t.color}`}
                      >
                        {t.code}
                      </span>
                      <span className="text-sm font-semibold text-text-primary">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>

            <RevealSection>
              <h2 className="mb-4 font-display text-xl font-bold text-text-primary">Watch Statistics</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Clock,
                    v: "1.2k",
                    l: "Hours Watched",
                    sub: "+12% from last month",
                    border: "border-l-secondary",
                    text: "text-secondary",
                  },
                  {
                    icon: Ticket,
                    v: "84",
                    l: "Matches Watched",
                    sub: "Top 5% of Viewers",
                    border: "border-l-tertiary",
                    text: "text-tertiary",
                  },
                  {
                    icon: Film,
                    v: "15",
                    l: "Shows Completed",
                    sub: "3 New Badges Earned",
                    border: "border-l-premium",
                    text: "text-premium",
                  },
                ].map(({ icon: Icon, v, l, sub, border, text }) => (
                  <div key={l} className={`rounded-md border border-white/10 bg-surface p-5 border-l-2 ${border}`}>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase text-text-tertiary">
                      <Icon className={`h-3.5 w-3.5 ${text}`} /> {l}
                    </div>
                    <p className="mt-1 font-display text-3xl font-extrabold text-text-primary">{v}</p>
                    <p className={`mt-1 text-xs ${text}`}>{sub}</p>
                  </div>
                ))}
              </div>
            </RevealSection>

            <RevealSection>
              <h2 className="mb-4 font-display text-xl font-bold text-text-primary">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {quickActions.map((a) => (
                  <Link
                    key={a.label}
                    to={a.to}
                    className="flex flex-col items-center gap-2 rounded-md border border-white/10 bg-surface p-6 text-sm font-medium text-text-secondary transition-colors hover:border-white/20 hover:text-text-primary"
                  >
                    <a.icon className="h-5 w-5" />
                    {a.label}
                  </Link>
                ))}
              </div>
            </RevealSection>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-lg border border-white/10 bg-surface p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-text-primary">
                <Bell className="h-4 w-4 text-tertiary" /> Reminders
              </h3>
              <div className="flex flex-col gap-4">
                {reminders.map((r) => (
                  <div key={r.title} className="flex gap-3">
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase text-text-tertiary">{r.date.split(" ")[0]}</p>
                      <p className="font-display text-lg font-extrabold text-tertiary">{r.date.split(" ")[1]}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{r.title}</p>
                      <p className="text-xs text-text-tertiary">{r.meta}</p>
                      <button className="mt-1.5 rounded-full bg-surface-raised px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-text-secondary hover:text-text-primary">
                        Remind Me
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-surface p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-text-primary">
                <MessageSquare className="h-4 w-4 text-tertiary" /> Updates
              </h3>
              <div className="flex flex-col gap-3">
                {updates.map((u, i) => (
                  <div key={u.title} className="flex gap-2 text-sm">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${i < 2 ? "bg-tertiary" : "bg-white/20"}`} />
                    <div>
                      <p className="font-medium text-text-primary">{u.title}</p>
                      <p className="text-xs text-text-tertiary">{u.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 border-l-2 border-l-success bg-surface p-5">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-success">
                <ShieldCheck className="h-4 w-4" /> Account Secured
              </h3>
              <p className="text-xs text-text-tertiary">
                2FA is active. Last login from London, UK on current device.
              </p>
              <Link to="/settings" className="mt-2 inline-block text-xs font-semibold text-success">
                Review Security Settings →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
