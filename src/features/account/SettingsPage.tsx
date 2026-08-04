import { RevealSection } from "@/components/rails/RevealSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Laptop, Tv, Smartphone } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Button } from "@/components/ui/Button";
import { FilterPill } from "@/components/ui/FilterPill";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { Toggle } from "@/components/ui/Toggle";
import { useAppSelector } from "@/store/hooks";

const devices = [
  { icon: Laptop, name: "MacBook Pro 16\"", meta: "Current Device • New York, US", status: "Online Now", current: true },
  { icon: Tv, name: "Apple TV 4K", meta: "Living Room • 2 days ago", status: "Sign Out Device", current: false },
  { icon: Smartphone, name: "iPhone 15 Pro", meta: "Mobile • 5 hours ago", status: "Sign Out Device", current: false },
];

export function SettingsPage() {
  const user = useAppSelector((s) => s.auth.user);
  const [quality, setQuality] = useState<"Auto" | "HD" | "4K Ultra">("4K Ultra");
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [autoplayPreviews, setAutoplayPreviews] = useState(false);
  const [pip, setPip] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="flex flex-col gap-10 px-6 py-8 md:px-10">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">Settings</h1>
          <p className="mt-1 text-sm text-text-secondary">Customize your WatchNXT experience.</p>
        </div>

        <RevealSection>
          <h2 className="mb-4 font-display text-lg font-bold text-text-primary">Account &amp; Profile</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-surface p-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-wide text-text-tertiary">Personal Info</p>
              <p className="text-xs text-text-tertiary">Display Name</p>
              <p className="font-semibold text-text-primary">{user?.name ?? "Alex Morgan"}</p>
              <p className="mt-3 text-xs text-text-tertiary">Email Address</p>
              <p className="font-semibold text-text-primary">alexrivera@watchnxt.com</p>
              <button className="mt-4 text-sm font-semibold text-secondary">Edit details</button>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface p-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-wide text-text-tertiary">Security</p>
              <p className="text-xs text-text-tertiary">Mobile Number</p>
              <p className="font-semibold text-text-primary">+91 9123456789</p>
              <p className="mt-3 text-xs text-text-tertiary">Password</p>
              <p className="font-semibold text-text-primary">•••••••••••</p>
              <Button variant="gradient" radius="full" className="mt-4">
                Update Security
              </Button>
            </div>
          </div>
        </RevealSection>

        <RevealSection>
          <h2 className="mb-4 font-display text-lg font-bold text-text-primary">Playback Settings</h2>
          <div className="rounded-lg border border-white/10 bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-text-primary">Video Quality</p>
                <p className="text-sm text-text-tertiary">Adjust visual fidelity for your connection</p>
              </div>
              <div className="flex gap-2">
                {(["Auto", "HD", "4K Ultra"] as const).map((q) => (
                  <FilterPill key={q} label={q} active={quality === q} onClick={() => setQuality(q)} />
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">Autoplay Next Video</span>
                <Toggle checked={autoplayNext} onChange={setAutoplayNext} aria-label="Autoplay Next Video" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">Data Saver Mode</span>
                <Toggle checked={dataSaver} onChange={setDataSaver} aria-label="Data Saver Mode" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">Autoplay Previews</span>
                <Toggle checked={autoplayPreviews} onChange={setAutoplayPreviews} aria-label="Autoplay Previews" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="shrink-0 text-sm font-medium text-text-primary">Default Audio</span>
                <FilterSelect label="Audio" value="English (Dolby Atmos)" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">Picture-in-Picture</span>
                <Toggle checked={pip} onChange={setPip} aria-label="Picture-in-Picture" />
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-text-primary">Device Management</h2>
            <button className="text-sm font-medium text-danger">Sign out of all devices</button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {devices.map((d) => (
              <div key={d.name} className="rounded-lg border border-white/10 bg-surface p-5 text-center">
                <d.icon className="mx-auto mb-3 h-6 w-6 text-text-secondary" />
                <p className="font-semibold text-text-primary">{d.name}</p>
                <p className="mt-1 text-xs text-text-tertiary">{d.meta}</p>
                <p className={`mt-3 border-t border-white/5 pt-3 text-sm font-semibold ${d.current ? "text-success" : "text-secondary"}`}>
                  {d.status}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>

        <p className="text-center text-xs text-text-tertiary">
          Need more help? Visit our{" "}
          <Link to="/support" className="font-semibold text-tertiary hover:underline">
            Support Center
          </Link>{" "}
          or{" "}
          <Link to="/support/chat" className="font-semibold text-tertiary hover:underline">
            chat with an expert
          </Link>
          .
        </p>
      </div>

      <Footer />
    </div>
  );
}
