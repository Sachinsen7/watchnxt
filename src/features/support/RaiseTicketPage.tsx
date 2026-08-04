import { useState } from "react";
import { Textarea } from "@heroui/react";
import { UploadCloud, X, HelpCircle, AudioWaveform, Radio, MessagesSquare, Clock } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { FilterPill } from "@/components/ui/FilterPill";
import { NativeSelect } from "@/components/ui/NativeSelect";
import { Checkbox } from "@/components/ui/Checkbox";

const issueCategories = [
  { value: "streaming", label: "Streaming Issues" },
  { value: "billing", label: "Billing & Subscription" },
  { value: "account", label: "Account & Login" },
  { value: "other", label: "Other" },
];

const deviceOptions = [
  { value: "desktop", label: "Desktop (Windows/Mac)" },
  { value: "mobile", label: "Mobile (iOS/Android)" },
  { value: "tv", label: "Smart TV / Fire TV" },
];

const slaEstimates = [
  { label: "Critical", value: "~4 Hours", color: "bg-danger" },
  { label: "High", value: "~12 Hours", color: "bg-warning" },
  { label: "Medium", value: "~24 Hours", color: "bg-secondary" },
  { label: "Low", value: "~48 Hours", color: "bg-text-tertiary" },
];

const recentTickets = [
  { id: "#WN-9421", title: "Billing discrepancy - Premium Plan", status: "Pending", date: "Oct 24, 2023" },
  { id: "#WN-8812", title: "Unable to login on Fire TV", status: "Resolved", date: "Sep 15, 2023" },
];

const helpfulResources = [
  { icon: HelpCircle, label: "Frequently Asked Questions" },
  { icon: AudioWaveform, label: "Streaming Troubleshooting" },
  { icon: Radio, label: "Platform Status: Operational" },
  { icon: MessagesSquare, label: "Community Forum" },
];

export function RaiseTicketPage() {
  const [priority, setPriority] = useState("Medium");
  const [fileName, setFileName] = useState<string | null>("error_screenshot.png");
  const [consent, setConsent] = useState(false);
  const [issueCategory, setIssueCategory] = useState("streaming");
  const [device, setDevice] = useState("desktop");

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-4 md:px-10">
        <Breadcrumb items={[{ label: "Support", to: "/support" }, { label: "Raise Ticket" }]} />
      </div>

      <div className="px-6 pt-4 md:px-10">
        <h1 className="font-display text-3xl font-extrabold text-text-primary">Raise a Support Ticket</h1>
        <p className="mt-2 max-w-2xl text-sm text-text-secondary">
          Describe your issue and our support team will get back to you as quickly as possible. We prioritize
          premium subscribers for ultra-fast response times.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 py-10 md:px-10 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-5 rounded-lg bg-surface p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">Issue Category</label>
              <NativeSelect
                aria-label="Issue Category"
                value={issueCategory}
                onChange={setIssueCategory}
                options={issueCategories}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">Subject</label>
              <input
                placeholder="Briefly summarize the problem"
                className="h-12 rounded-lg bg-surface-raised px-4 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus-visible:shadow-[0_0_0_2px_rgb(var(--accent-secondary))]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">Describe Your Issue</label>
            <Textarea
              aria-label="Describe Your Issue"
              placeholder="Please provide as much detail as possible. Include steps to reproduce if it's a technical bug..."
              minRows={5}
              radius="lg"
              classNames={{ inputWrapper: "bg-surface-raised", input: "bg-transparent text-sm" }}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">Device</label>
              <NativeSelect aria-label="Device" value={device} onChange={setDevice} options={deviceOptions} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">Browser / App Version</label>
              <input
                placeholder="Chrome v124.0.0"
                className="h-12 rounded-lg bg-surface-raised px-4 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus-visible:shadow-[0_0_0_2px_rgb(var(--accent-secondary))]"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-text-secondary">Priority Level</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Low", "Medium", "High", "Critical"].map((p) => (
                <FilterPill key={p} label={p} active={priority === p} onClick={() => setPriority(p)} />
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-text-secondary">Attachments</label>
            <label className="mt-2 flex cursor-pointer flex-col items-center gap-2 rounded-lg bg-surface-raised/50 py-10 text-center outline-dashed outline-1 outline-white/10">
              <UploadCloud className="h-6 w-6 text-text-tertiary" />
              <span className="text-sm text-text-secondary">
                Drag &amp; drop files or <span className="text-secondary">browse</span>
              </span>
              <span className="text-xs text-text-tertiary">Supported formats: JPG, PNG, PDF, LOG (Max 10MB)</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </label>
            {fileName && (
              <div className="mt-3 flex items-center justify-between rounded-md bg-surface-raised px-4 py-3">
                <span className="text-sm text-text-secondary">{fileName} • 1.2 MB • Uploaded</span>
                <button onClick={() => setFileName(null)} aria-label="Remove file">
                  <X className="h-4 w-4 text-text-tertiary" />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">Reply-to Email</label>
              <input
                placeholder="you@example.com"
                className="h-12 rounded-lg bg-surface-raised px-4 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus-visible:shadow-[0_0_0_2px_rgb(var(--accent-secondary))]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">Phone Number (Optional)</label>
              <input
                placeholder="+1 (555) 000-0000"
                className="h-12 rounded-lg bg-surface-raised px-4 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus-visible:shadow-[0_0_0_2px_rgb(var(--accent-secondary))]"
              />
            </div>
          </div>

          <Checkbox checked={consent} onChange={setConsent}>
            I agree to share my device diagnostic data and logs to help the technical team resolve my issue faster.
          </Checkbox>

          <div className="flex items-center gap-4 pt-2">
            <Button variant="gradient" className="px-6">
              Submit Ticket
            </Button>
            <Button
              variant="flat"
              className="border border-white/25 bg-transparent px-6 text-text-primary transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Save Draft
            </Button>
            <button className="text-sm font-medium text-text-tertiary">Cancel</button>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-lg bg-surface p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-text-primary">
              <Clock className="h-4 w-4 text-secondary" /> SLA Estimates
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {slaEstimates.map((s) => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-text-secondary">
                    <span className={`h-2 w-2 rounded-full ${s.color}`} /> {s.label}
                  </span>
                  <span className="font-semibold text-text-primary">{s.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-text-tertiary">Business days only (Mon-Fri)</p>
          </div>

          <div className="rounded-lg bg-surface p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-text-tertiary">Recent Tickets</h3>
            <div className="flex flex-col gap-3">
              {recentTickets.map((t) => (
                <div key={t.id} className="rounded-md bg-surface-raised p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-text-primary">{t.id}</span>
                    <span className={t.status === "Pending" ? "text-warning" : "text-success"}>{t.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">{t.title}</p>
                  <p className="mt-1 text-[11px] text-text-tertiary">{t.date}</p>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full text-center text-xs font-semibold text-tertiary">
              View All Activity
            </button>
          </div>

          <div className="rounded-lg bg-surface p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-text-tertiary">Helpful Resources</h3>
            <div className="flex flex-col gap-3">
              {helpfulResources.map((r) => (
                <button key={r.label} className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-text-primary">
                  <r.icon className="h-4 w-4 shrink-0" /> {r.label}
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
