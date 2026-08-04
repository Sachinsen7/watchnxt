import { useState } from "react";
import { History, Check } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { PlayerMatchSummary } from "./PlayerMatchSummary";
import { cn } from "@/lib/utils";

const languages = ["English", "Hindi", "Telugu", "Tamil"];

interface AudioCommentaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchTitle: string;
  thumbnail: string;
}

export function AudioCommentaryModal({ isOpen, onClose, matchTitle, thumbnail }: AudioCommentaryModalProps) {
  const [language, setLanguage] = useState("English");
  const [remember, setRemember] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Audio & Commentary"
      subtitle="Choose your preferred language and commentary."
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
      <PlayerMatchSummary thumbnail={thumbnail} title={matchTitle} meta={`${language} (Stereo) • ${language} Commentary`} />

      <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-wide text-tertiary">Audio Languages</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {languages.map((lang) => {
          const selected = language === lang;
          return (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={cn(
                "flex items-center justify-between rounded-lg border px-4 py-3.5 text-left text-sm font-medium transition-colors",
                selected
                  ? "border-tertiary/50 bg-tertiary/10 text-text-primary"
                  : "border-white/10 bg-white/5 text-text-secondary hover:border-white/20",
              )}
            >
              {lang}
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                  selected ? "border-tertiary bg-tertiary text-canvas" : "border-white/20",
                )}
              >
                {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
