import { useState } from "react";
import { Search, Phone, Image as ImageIcon, Paperclip, Smile, Send, Share2, X, Pencil, FileText, Star } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";

const conversations = [
  { name: "Sarah", time: "10:24 AM", preview: "Checking your connection stats now..", tag: "Active", active: true, seed: "agent-sarah" },
  { name: "Marcus", time: "8:12 AM", preview: "The refund has been processed. Have", tag: "Resolved", active: false, seed: "agent-marcus" },
];

const yesterday = [
  { name: "Elena", time: "Nov 14", preview: "Glad we could resolve the 4K playback", seed: "agent-elena" },
];

const messages = [
  {
    from: "agent" as const,
    text: "Hello! I'm Sarah from WatchNXT. I see you're having some trouble with buffering on the Formula 1 live stream. I'm checking your account's connection status right now.",
    time: "10:20 AM",
  },
  {
    from: "user" as const,
    text: "Yes, exactly. It keeps dropping to 720p even though I have 500Mbps fiber. My subscription is Premium 4K.",
    time: "10:22 AM • Read",
  },
];

const quickActions = [
  { icon: Pencil, label: "New Ticket" },
  { icon: FileText, label: "Transcript" },
  { icon: Share2, label: "Share" },
  { icon: X, label: "End Chat" },
];

const suggestions = [
  { icon: Star, title: "Resolving Buffering Issues", desc: "Recommended for high bitrate streaming." },
  { icon: FileText, title: "Device Compatibility Guide", desc: "Check supported browsers and OS versions." },
  { icon: Star, title: "Manage Premium Benefits", desc: "Upgrade or manage your subscription tier." },
];

export function LiveChatPage() {
  const [draft, setDraft] = useState("");

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="grid grid-cols-1 gap-0 px-6 py-6 md:px-10 lg:grid-cols-[260px_1fr_280px]">
        <div className="flex flex-col gap-4 pr-0 lg:pr-4">
          <div className="flex items-center gap-2 rounded-full bg-surface px-4 py-2.5">
            <Search className="h-4 w-4 text-text-tertiary" />
            <input
              placeholder="Search conversations..."
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary"
            />
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-tertiary">Today</p>
            <div className="flex flex-col gap-1">
              {conversations.map((c) => (
                <button
                  key={c.name}
                  className={`flex items-center gap-3 rounded-lg p-3 text-left ${c.active ? "bg-surface-raised" : "hover:bg-white/5"}`}
                >
                  <div className="relative shrink-0">
                    <img src={`https://picsum.photos/seed/${c.seed}/80/80`} alt="" className="h-10 w-10 rounded-full object-cover" />
                    {c.active && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-canvas" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-text-primary">{c.name}</span>
                      <span className="text-[11px] text-text-tertiary">{c.time}</span>
                    </div>
                    <p className="truncate text-xs text-text-tertiary">{c.preview}</p>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        c.tag === "Active" ? "bg-secondary/20 text-secondary" : "bg-white/10 text-text-tertiary"
                      }`}
                    >
                      {c.tag}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-tertiary">Yesterday</p>
            <div className="flex flex-col gap-1">
              {yesterday.map((c) => (
                <button key={c.name} className="flex items-center gap-3 rounded-lg p-3 text-left hover:bg-white/5">
                  <img src={`https://picsum.photos/seed/${c.seed}/80/80`} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-text-primary">{c.name}</span>
                      <span className="text-[11px] text-text-tertiary">{c.time}</span>
                    </div>
                    <p className="truncate text-xs text-text-tertiary">{c.preview}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg bg-surface lg:mx-4">
          <div className="flex items-center justify-between border-b border-white/5 p-4">
            <div className="flex items-center gap-3">
              <img src="https://picsum.photos/seed/agent-sarah/80/80" alt="" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="flex items-center gap-1.5 text-sm font-bold text-text-primary">
                  Sarah <span className="h-2 w-2 rounded-full bg-secondary" />
                </p>
                <p className="text-xs text-text-tertiary">Customer Success Specialist • Response time &lt; 2 mins</p>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-surface-raised px-4 py-2 text-sm font-semibold text-text-primary">
              <Phone className="h-3.5 w-3.5" /> Call Agent
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-6">
            <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
              Today, November 15
            </p>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-md rounded-2xl px-4 py-3 text-sm ${
                    m.from === "user" ? "bg-gradient-cta text-text-on-accent" : "bg-surface-raised text-text-primary"
                  }`}
                >
                  {m.text}
                  <p className={`mt-1.5 text-[11px] ${m.from === "user" ? "text-text-on-accent/70" : "text-text-tertiary"}`}>
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 border-t border-white/5 p-4">
            <button aria-label="Attach image" className="text-text-tertiary hover:text-text-primary">
              <ImageIcon className="h-4 w-4" />
            </button>
            <button aria-label="Attach file" className="text-text-tertiary hover:text-text-primary">
              <Paperclip className="h-4 w-4" />
            </button>
            <button aria-label="Emoji" className="text-text-tertiary hover:text-text-primary">
              <Smile className="h-4 w-4" />
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary"
            />
            <button
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-cta text-text-on-accent"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        <aside className="flex flex-col gap-6 pl-0 pt-6 lg:pl-4 lg:pt-0">
          <div className="rounded-lg bg-surface p-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-text-tertiary">Conversation Details</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">Ticket ID</span>
                <span className="font-semibold text-text-primary">#WNX-CHAT-8812</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">Category</span>
                <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-semibold text-secondary">
                  Streaming Quality
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">Priority</span>
                <span className="font-semibold text-warning">High</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">Status</span>
                <span className="font-semibold text-success">Open</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-surface p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-text-tertiary">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  className="flex flex-col items-center gap-2 rounded-md bg-surface-raised py-4 text-xs font-medium text-text-secondary hover:text-text-primary"
                >
                  <a.icon className="h-4 w-4" /> {a.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-surface p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-text-tertiary">Suggested Solutions</h3>
            <div className="flex flex-col gap-3">
              {suggestions.map((s) => (
                <button key={s.title} className="flex items-start gap-3 rounded-md p-2 text-left hover:bg-white/5">
                  <s.icon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{s.title}</p>
                    <p className="text-xs text-text-tertiary">{s.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
