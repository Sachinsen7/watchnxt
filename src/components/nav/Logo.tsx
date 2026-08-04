export function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <img
        src="/brand/logo-icon.png"
        alt="WatchNXT"
        className="h-9 w-9 shrink-0 rounded-xl object-cover shadow-glow-violet"
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <img
        src="/brand/logo-icon.png"
        alt="WatchNXT"
        className="h-16 w-16 shrink-0 rounded-2xl object-cover shadow-glow-violet"
      />
      <div className="leading-tight">
        <p className="font-display text-lg font-extrabold text-text-primary">WatchNXT</p>
        <p className="text-[9px] font-semibold uppercase tracking-wide text-text-tertiary">
          Stream the Future of Sports
        </p>
      </div>
    </div>
  );
}
