import { useRef } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
}

/** HeroUI has no OTP primitive — built directly on bare inputs per DESIGN_SYSTEM.md §7. */
export function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function setDigit(i: number, digit: string) {
    const next = [...value];
    next[i] = digit;
    onChange(next);
  }

  function handleChange(i: number, raw: string) {
    const clean = raw.replace(/\D/g, "").slice(-1);
    setDigit(i, clean);
    if (clean && i < length - 1) refs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    e.preventDefault();
    const next = pasted.split("");
    onChange(next);
    refs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div className="flex gap-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          className={cn(
            "h-14 w-12 rounded-md border bg-surface text-center text-lg font-semibold text-text-primary outline-none",
            "border-border-subtle transition-colors focus:border-secondary",
            "focus:shadow-[0_0_0_3px_rgba(34,211,238,0.25)]",
          )}
        />
      ))}
    </div>
  );
}
