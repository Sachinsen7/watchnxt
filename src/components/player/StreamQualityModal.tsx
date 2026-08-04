import { useState } from "react";
import { History } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PlayerMatchSummary } from "./PlayerMatchSummary";
import { cn } from "@/lib/utils";

const qualities = [
  { value: "auto", label: "Auto (Recommended)", desc: "Adjusts based on your speed" },
  { value: "4k", label: "4K Ultra HD", badge: "premium" as const, desc: "Best for large screens (~7GB/hr)" },
  { value: "1080p", label: "1080p Full HD", badge: "hd" as const, desc: "High fidelity (~3GB/hr)" },
  { value: "720p", label: "720p HD", badge: "hd" as const, desc: "Balanced (~1.5GB/hr)" },
  { value: "480p", label: "480p SD", desc: "Standard (~700MB/hr)" },
  { value: "240p", label: "Data Saver (240p)", desc: "Minimal usage (~300MB/hr)" },
];

interface StreamQualityModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchTitle: string;
  thumbnail: string;
}

export function StreamQualityModal({ isOpen, onClose, matchTitle, thumbnail }: StreamQualityModalProps) {
  const [quality, setQuality] = useState("auto");
  const [remember, setRemember] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Stream Quality"
      subtitle="Choose your preferred Stream Quality."
      footer={
        <>
          <label className="flex items-center gap-2.5 text-sm text-text-secondary">
            <History className="h-4 w-4" /> Remember this preference
            <Toggle checked={remember} onChange={setRemember} aria-label="Remember this preference" />
          </label>
          <div className="flex gap-3">
            <Button variant="flat" className="bg-white/5 text-text-primary" onPress={onClose}>
              Cancel
            </Button>
            <Button variant="gradient" className="px-8" onPress={onClose}>
              Apply Preference
            </Button>
          </div>
        </>
      }
    >
      <PlayerMatchSummary thumbnail={thumbnail} title={matchTitle} meta="English (Stereo) • English Commentary" />

      <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-wide text-tertiary">Stream Quality</p>
      <div className="flex flex-col gap-3">
        {qualities.map((q) => {
          const selected = quality === q.value;
          return (
            <button
              key={q.value}
              onClick={() => setQuality(q.value)}
              className={cn(
                "flex items-center justify-between gap-4 rounded-lg border px-4 py-3.5 text-left transition-colors",
                selected
                  ? "border-tertiary/50 bg-tertiary/10"
                  : "border-white/10 bg-white/5 hover:border-white/20",
              )}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-text-primary">{q.label}</span>
                  {q.badge && <Badge kind={q.badge}>{q.badge === "premium" ? "PREMIUM" : "HD"}</Badge>}
                </div>
                <p className="mt-0.5 text-xs text-text-tertiary">{q.desc}</p>
              </div>
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                  selected ? "border-tertiary" : "border-white/20",
                )}
              >
                {selected && <span className="h-2.5 w-2.5 rounded-full bg-tertiary" />}
              </span>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
