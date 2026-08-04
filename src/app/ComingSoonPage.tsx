import { Sparkles } from "lucide-react";

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-raised">
        <Sparkles className="h-6 w-6 text-secondary" />
      </div>
      <h1 className="font-display text-2xl font-bold text-text-primary">{title}</h1>
      <p className="max-w-sm text-sm text-text-secondary">
        This screen isn't in the reference Figma set yet — wired into routing and the nav so the
        app doesn't dead-end, ready to be designed next.
      </p>
    </div>
  );
}
