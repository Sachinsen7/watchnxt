import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  User,
  CreditCard,
  Film,
  Laptop2,
  Download,
  Lock,
  Bell,
  Settings,
  Key,
  Monitor,
  Receipt,
  ArrowRight,
  MessageSquare,
  Mail,
  Phone,
  FileText,
  ChevronDown,
} from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { img } from "@/mocks/sports";

const categories = [
  { icon: User, label: "Account & Profile", color: "text-secondary" },
  { icon: CreditCard, label: "Subscription & Billing", color: "text-secondary" },
  { icon: Film, label: "Streaming & Playback", color: "text-premium" },
  { icon: Laptop2, label: "Device Compatibility", color: "text-tertiary" },
  { icon: Download, label: "Downloads & Offline", color: "text-secondary" },
  { icon: Lock, label: "Login & Security", color: "text-premium" },
  { icon: Bell, label: "Notifications", color: "text-tertiary" },
  { icon: Settings, label: "App Settings", color: "text-secondary" },
];

const helpArticles = [
  { icon: Key, title: "How to reset your password", desc: "Step-by-step guide to recovering your account access securely.", read: "3 min read" },
  { icon: Monitor, title: "Fixing 4K streaming buffering", desc: "Optimize your network connection for premium high-fidelity viewing.", read: "5 min read" },
  { icon: Receipt, title: "Managing your payment methods", desc: "Update cards, view invoices, or change your billing cycle.", read: "2 min read" },
];

const contactMethods = [
  { icon: MessageSquare, title: "Live Chat", badge: "Online", desc: "Instant support for urgent streaming or technical issues.", cta: "Start Chat", meta: "Avg response: < 2 mins", to: "/support/chat", gradient: true },
  { icon: Mail, title: "Email Support", desc: "Detailed inquiries and billing disputes handled within 24h.", cta: "Send Email", meta: "Avg response: 12 hours", to: "#" },
  { icon: Phone, title: "Call Support", desc: "Priority voice assistance for Premium & Galactic members.", cta: "Call Now", meta: "", to: "#" },
  { icon: FileText, title: "Raise Ticket", desc: "Formally document an issue for engineering review.", cta: "Open Ticket", meta: "", to: "/support/raise-ticket" },
];

const recentTickets = [
  { id: "#WN-9942", title: "Refund...", status: "Pending", time: "Updated 2h ago" },
  { id: "#WN-8812", title: "4K Play...", status: "Closed", time: "Solved 3 days ago" },
];

const faqs = [
  { q: "Can I watch on multiple devices simultaneously?", a: "Yes — Monthly Premium supports up to 4 devices at once, streaming different content simultaneously on your account." },
  { q: "How do I cancel my subscription?", a: "Go to Settings → Playback Settings, or Profile → Subscription, and choose Cancel Plan. You'll keep access until the end of the billing period." },
  { q: "What video quality is available?", a: "Depending on your plan, WatchNXT streams up to 4K Ultra HD with Dolby Atmos on supported devices." },
];

export function SupportCenterPage() {
  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-10 text-center md:px-10">
        <h1 className="font-display text-4xl font-extrabold text-text-primary">Support Center</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-text-secondary">
          Need help? Find answers, troubleshoot issues or contact our support team.
        </p>
        <Input
          placeholder="Search help articles, FAQs or account issues..."
          startContent={<Search className="h-4 w-4 text-text-tertiary" />}
          radius="full"
          size="lg"
          className="mx-auto mt-6 max-w-xl"
          classNames={{
            inputWrapper: "h-14 bg-surface",
            innerWrapper: "gap-2.5",
            input: "bg-transparent appearance-none text-base",
          }}
        />
      </div>

      <div className="px-6 pt-10 md:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((c) => (
            <button
              key={c.label}
              className="flex flex-col items-center gap-3 rounded-md bg-surface p-6 text-center transition-transform hover:scale-[1.02]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-raised">
                <c.icon className={`h-5 w-5 ${c.color}`} />
              </span>
              <span className="text-sm font-semibold text-text-primary">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 py-12 md:px-10 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-12">
          <section>
            <h2 className="mb-5 flex items-center gap-2 font-display text-2xl font-bold text-text-primary">
              <FileText className="h-5 w-5 text-secondary" /> Popular Help Articles
            </h2>
            <div className="flex flex-col gap-4">
              {helpArticles.map((a) => (
                <button
                  key={a.title}
                  className="flex items-center gap-4 rounded-md bg-surface p-5 text-left hover:bg-surface-raised"
                >
                  <a.icon className="h-5 w-5 shrink-0 text-secondary" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-secondary">{a.title}</p>
                    <p className="mt-0.5 text-sm text-text-secondary">{a.desc}</p>
                    <p className="mt-1.5 text-xs text-text-tertiary">{a.read}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-text-tertiary" />
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Contact Support</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactMethods.map((m) => (
                <div key={m.title} className="rounded-md bg-surface p-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
                    <m.icon className="h-4 w-4 text-text-secondary" /> {m.title}
                    {m.badge && (
                      <Badge kind="live" className="ml-1">
                        {m.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">{m.desc}</p>
                  <div className="mt-4">
                    <Link to={m.to}>
                      <Button
                        variant={m.gradient ? "gradient" : "flat"}
                        radius="md"
                        className={
                          m.gradient
                            ? "px-6"
                            : "border border-secondary/30 bg-surface-raised px-6 text-text-primary transition-all hover:scale-[1.02] hover:border-secondary/60 hover:bg-white/10"
                        }
                      >
                        {m.cta}
                      </Button>
                    </Link>
                  </div>
                  {m.meta && <p className="mt-2 text-xs text-text-tertiary">{m.meta}</p>}
                </div>
              ))}
            </div>
          </section>

          <FaqSection />
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-md bg-surface p-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-secondary">Service Overview</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">Platform Status</span>
                <span className="flex items-center gap-1.5 font-semibold text-success">
                  <span className="h-2 w-2 rounded-full bg-success" /> Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">Avg Response</span>
                <span className="font-semibold text-text-primary">4.2 Minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">Global Satisfaction</span>
                <span className="font-semibold text-premium">98.4% ★</span>
              </div>
            </div>
            <img
              src={img("service-overview", 500, 300)}
              alt=""
              className="mt-4 h-28 w-full rounded-md object-cover"
            />
          </div>

          <div className="rounded-md bg-surface p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-text-tertiary">
              Your Recent Tickets
            </h3>
            <div className="flex flex-col gap-3">
              {recentTickets.map((t) => (
                <div key={t.id} className="rounded-md bg-surface-raised p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-text-primary">
                      {t.id} - {t.title}
                    </span>
                    <Badge kind={t.status === "Pending" ? "premium" : "neutral"}>{t.status}</Badge>
                  </div>
                  <p className="mt-1 text-[11px] text-text-tertiary">{t.time}</p>
                </div>
              ))}
            </div>
            <Link to="/support/tickets" className="mt-3 block text-center text-xs font-semibold text-tertiary">
              View All Tickets ↗
            </Link>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}

/** Custom accordion — HeroUI's Accordion has repeatedly had rendering/animation issues in this app. */
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section>
      <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Frequently Asked Questions</h2>
      <div className="flex flex-col gap-3">
        {faqs.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={f.q}
              className={`overflow-hidden rounded-md border bg-surface transition-colors ${
                isOpen ? "border-secondary/40" : "border-white/5"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-sm font-semibold text-text-primary">{f.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-secondary"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-text-secondary">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
