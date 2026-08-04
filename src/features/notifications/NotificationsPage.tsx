import { RevealSection } from "@/components/rails/RevealSection";
import { Settings, BellOff, HelpCircle, Smartphone } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { img } from "@/mocks/sports";

const today = [
  {
    kind: "live" as const,
    thumb: "notif-1",
    title: "India vs Australia - Border Gavaskar Trophy",
    desc: "The final session of Day 3 has just begun. Watch the action live!",
    time: "10m ago",
    cta: "Watch Now",
    unread: true,
  },
  {
    kind: "release" as const,
    thumb: "notif-2",
    title: '"Grit and Glory" Documentary',
    desc: "A deep dive into the 1998 championship run. Exclusive to WatchNXT.",
    time: "2h ago",
    cta: "View Details",
    unread: true,
  },
];

const yesterday = [
  {
    title: "Event Reminder: F1 Monaco Grand Prix",
    desc: "Practice session starts in 2 hours. Don't forget to set your alerts for the qualifiers!",
    time: "Yesterday, 4:00 PM",
  },
  {
    title: "Subscription Renewed",
    desc: "Your WatchNXT Galactic Premium plan has been successfully renewed. Enjoy another month of 4K sports.",
    time: "Yesterday, 10:15 AM",
  },
];

const earlier = [
  {
    title: "NBA Classics: Top 10 Dunks of the Decade",
    desc: "Based on your interest in Basketball, we thought you'd love this curated collection.",
    time: "Mon, 6:30 PM",
    tag: "Recommended for You",
    thumb: "notif-3",
  },
];

const quickActions = [
  { icon: Settings, label: "Manage Preferences" },
  { icon: BellOff, label: "Mute Notifications" },
  { icon: HelpCircle, label: "Help Center" },
];

export function NotificationsPage() {
  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 py-8 md:px-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-display text-2xl font-bold text-text-primary">Notifications</h1>
              <p className="mt-1 text-sm text-text-secondary">
                Stay updated with the latest in sports and entertainment.
              </p>
            </div>
            <button className="text-sm font-medium text-tertiary">Mark all as read</button>
          </div>

          <div className="mt-8 flex flex-col gap-8">
            <RevealSection>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-tertiary">Today</h2>
              <div className="flex flex-col gap-4">
                {today.map((n) => (
                  <div key={n.title} className="relative flex items-start gap-4 rounded-lg bg-surface p-4">
                    {n.unread && <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary" />}
                    <img
                      src={img(n.thumb, 200, 200)}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      {n.kind === "live" ? (
                        <Badge kind="live">Live Now</Badge>
                      ) : (
                        <Badge kind="premium">New Release</Badge>
                      )}
                      <p className="mt-1.5 font-display text-base font-bold text-text-primary">{n.title}</p>
                      <p className="mt-0.5 text-sm text-text-secondary">{n.desc}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-text-tertiary">{n.time}</span>
                        <Button variant="gradient" size="sm" radius="md" className="px-4">
                          {n.cta}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>

            <RevealSection>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-tertiary">Yesterday</h2>
              <div className="flex flex-col gap-4">
                {yesterday.map((n) => (
                  <div key={n.title} className="flex items-start justify-between gap-4 rounded-lg bg-surface p-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-text-primary">{n.title}</p>
                      <p className="mt-0.5 text-sm text-text-secondary">{n.desc}</p>
                    </div>
                    <span className="shrink-0 text-xs text-text-tertiary">{n.time}</span>
                  </div>
                ))}
              </div>
            </RevealSection>

            <RevealSection>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-tertiary">
                Earlier This Week
              </h2>
              <div className="flex flex-col gap-4">
                {earlier.map((n) => (
                  <div key={n.title} className="flex items-start gap-4 rounded-lg bg-surface p-4">
                    <img
                      src={img(n.thumb, 200, 200)}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-secondary">{n.tag}</p>
                      <p className="mt-1 font-semibold text-text-primary">{n.title}</p>
                      <p className="mt-0.5 text-sm text-text-secondary">{n.desc}</p>
                    </div>
                    <span className="shrink-0 text-xs text-text-tertiary">{n.time}</span>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-lg border-l-2 border-primary bg-surface p-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-text-tertiary">Notification Summary</h3>
            <div className="mt-3 flex gap-8">
              <div>
                <p className="font-display text-3xl font-extrabold text-[#EEDBFF]">05</p>
                <p className="mt-1 text-[11px] font-semibold uppercase text-text-tertiary">Unread</p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-text-primary">12</p>
                <p className="mt-1 text-[11px] font-semibold uppercase text-text-tertiary">Total Today</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-surface p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-text-tertiary">Quick Actions</h3>
            <div className="flex flex-col gap-1">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  className="flex items-center gap-3 rounded-md px-2 py-2.5 text-sm font-medium text-text-secondary hover:bg-white/5 hover:text-text-primary"
                >
                  <a.icon className="h-4 w-4" /> {a.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-surface">
            <img src={img("app-promo", 500, 300)} alt="" className="h-32 w-full object-cover" />
            <div className="p-5">
              <p className="flex items-center gap-1.5 font-display text-lg font-extrabold text-secondary">
                <Smartphone className="h-4 w-4" /> Never Miss a Goal
              </p>
              <p className="mt-1 text-xs text-text-tertiary">
                Download the WatchNXT mobile app for instant haptic alerts and real-time stats.
              </p>
              <Button variant="flat" radius="full" className="mt-4 w-full bg-white text-text-on-accent">
                Download App
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
