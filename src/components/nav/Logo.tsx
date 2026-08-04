export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/brand/logo-icon.png"
        alt="WatchNXT"
        className="h-9 w-9 shrink-0 rounded-xl object-cover shadow-glow-violet"
      />
      {!compact && (
        <div className="leading-tight">
          
        </div>
      )}
    </div>
  );
}
