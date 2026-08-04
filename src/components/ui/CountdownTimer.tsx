import { useEffect, useState } from "react";

interface CountdownTimerProps {
  target: string;
  size?: "md" | "lg";
}

function getParts(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    mins: Math.floor((diff / 60000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

/** DD:HH:MM:SS countdown used on Upcoming Matches hero + Match Detail (§6.3 — ticks, never a hard re-render). */
export function CountdownTimer({ target, size = "md" }: CountdownTimerProps) {
  const [parts, setParts] = useState(() => getParts(target));

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: [string, number][] = [
    ["Days", parts.days],
    ["Hrs", parts.hours],
    ["Min", parts.mins],
    ["Sec", parts.secs],
  ];

  return (
    <div className="flex items-center gap-3">
      {units.map(([label, value], i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="text-center">
            <p
              className={
                size === "lg"
                  ? "font-display text-4xl font-extrabold text-text-primary md:text-5xl"
                  : "font-display text-2xl font-extrabold text-text-primary"
              }
            >
              {String(value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
              {label}
            </p>
          </div>
          {i < units.length - 1 && <span className="pb-4 text-xl text-text-tertiary">:</span>}
        </div>
      ))}
    </div>
  );
}
