import { useState } from "react";
import { Eye, Download, MessageCircle, RotateCcw, CheckCircle2 } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Button } from "@/components/ui/Button";
import { FilterPill } from "@/components/ui/FilterPill";

const statusFilters = ["All", "Open", "In Progress", "Resolved"];

const tickets = [
  {
    id: "#WNX-8921",
    subject: "4K Stream Lag during Finals",
    category: "Technical / Streaming",
    priority: "Critical",
    priorityColor: "text-danger",
    status: "In Progress",
    statusColor: "bg-warning/20 text-warning",
    updated: "2 hours ago",
    action: "reply" as const,
  },
  {
    id: "#WNX-7432",
    subject: "Subscription Billing Query",
    category: "Account / Billing",
    priority: "High",
    priorityColor: "text-warning",
    status: "Open",
    statusColor: "bg-secondary/20 text-secondary",
    updated: "Yesterday",
    action: "reply" as const,
  },
  {
    id: "#WNX-6109",
    subject: "Multiple Device Login Issue",
    category: "Access / Login",
    priority: "Medium",
    priorityColor: "text-secondary",
    status: "Resolved",
    statusColor: "bg-success/20 text-success",
    updated: "3 days ago",
    action: "view" as const,
  },
];

const activity = [
  { icon: RotateCcw, title: "Support Replied", ticket: "Ticket #WNX-8921", desc: "\"We've escalated your streaming quality issue to our NOC team for immediate review.\"", time: "14 mins ago" },
  { icon: CheckCircle2, title: "Issue Resolved", ticket: "Ticket #WNX-6109", desc: "System successfully reset the device limit for your premium account.", time: "3 hours ago" },
  { icon: RotateCcw, title: "Ticket Updated", ticket: "Ticket #WNX-7432", desc: "Priority changed from Medium to High by User.", time: "Yesterday" },
];

export function MyTicketsPage() {
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4 px-6 pt-6 md:px-10">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-text-primary">My Support Tickets</h1>
          <p className="mt-2 max-w-xl text-sm text-text-secondary">
            Track the progress of your support requests and communicate with our support team.
          </p>
        </div>
        <Button variant="gradient" radius="full" className="px-6" startContent="+">
          Create New Ticket
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-6 pt-8 md:px-10">
        <span className="text-xs font-bold uppercase tracking-wide text-text-tertiary">Status:</span>
        {statusFilters.map((f) => (
          <FilterPill key={f} label={f} active={status === f} onClick={() => setStatus(f)} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 py-8 md:px-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="overflow-x-auto rounded-lg bg-surface">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-left text-[11px] font-bold uppercase tracking-wide text-text-tertiary">
                  <th className="px-5 py-4">Ticket ID</th>
                  <th className="px-5 py-4">Subject</th>
                  <th className="px-5 py-4">Priority</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Last Updated</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id} className="border-t border-white/5">
                    <td className="px-5 py-4 font-semibold text-text-primary">{t.id}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-text-primary">{t.subject}</p>
                      <p className="text-xs text-text-tertiary">{t.category}</p>
                    </td>
                    <td className={`px-5 py-4 font-semibold ${t.priorityColor}`}>{t.priority}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${t.statusColor}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-text-secondary">{t.updated}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {t.action === "view" ? (
                          <>
                            <Eye className="h-4 w-4 text-text-tertiary" />
                            <Button variant="flat" size="sm" radius="full" className="bg-surface-raised text-text-primary">
                              View
                            </Button>
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 text-text-tertiary" />
                            <Button variant="flat" size="sm" radius="full" className="bg-surface-raised text-text-primary" startContent={<MessageCircle className="h-3.5 w-3.5" />}>
                              Reply
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-text-tertiary">
            <span>Showing 1-3 of 12 tickets</span>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    page === p ? "bg-gradient-cta text-text-on-accent" : "bg-surface text-text-secondary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-lg bg-surface p-5">
            <h3 className="font-display text-lg font-bold text-text-primary">Overview</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-surface-raised p-3">
                <p className="text-[10px] font-bold uppercase text-text-tertiary">Total Tickets</p>
                <p className="mt-1 font-display text-xl font-extrabold text-text-primary">12</p>
              </div>
              <div className="rounded-md bg-surface-raised p-3">
                <p className="text-[10px] font-bold uppercase text-text-tertiary">Active</p>
                <p className="mt-1 font-display text-xl font-extrabold text-secondary">02</p>
              </div>
              <div className="rounded-md bg-surface-raised p-3">
                <p className="text-[10px] font-bold uppercase text-text-tertiary">Resolved</p>
                <p className="mt-1 font-display text-xl font-extrabold text-text-primary">10</p>
              </div>
              <div className="rounded-md bg-surface-raised p-3">
                <p className="text-[10px] font-bold uppercase text-text-tertiary">CSAT Score</p>
                <p className="mt-1 font-display text-xl font-extrabold text-premium">4.8/5</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-text-tertiary">
                <span>Avg. Response Time</span>
                <span className="font-semibold text-text-primary">1h 12m</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                <div className="h-full w-4/5 rounded-full bg-gradient-cta" />
              </div>
              <p className="mt-1.5 text-[11px] text-text-tertiary">Better than 92% of users this month.</p>
            </div>
          </div>

          <div className="rounded-lg bg-surface p-5">
            <h3 className="font-display text-lg font-bold text-text-primary">Recent Activity</h3>
            <div className="mt-4 flex flex-col gap-4">
              {activity.map((a) => (
                <div key={a.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-raised">
                    <a.icon className="h-3.5 w-3.5 text-secondary" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{a.title}</p>
                    <p className="text-xs text-text-tertiary">{a.ticket}</p>
                    <p className="mt-1 text-xs text-text-secondary">{a.desc}</p>
                    <p className="mt-1 text-[11px] text-text-tertiary">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-lg bg-surface-raised py-2.5 text-sm font-semibold text-text-secondary hover:text-text-primary">
              View Full History
            </button>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
