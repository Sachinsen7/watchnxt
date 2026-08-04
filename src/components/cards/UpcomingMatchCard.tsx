import { CalendarDays, MapPin, Bell } from "lucide-react";
import { CardBase } from "./CardBase";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCountdown } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleReminder } from "@/store/slices/myList.slice";
import type { Match } from "@/types/content";

export function UpcomingMatchCard({ match }: { match: Match }) {
  const dispatch = useAppDispatch();
  const reminded = useAppSelector((s) => s.myList.reminders.includes(match.id));

  return (
    <CardBase>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img src={match.thumbnail} alt={match.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
        <div className="absolute left-2 top-2 flex gap-1.5">
          {match.tags?.map((t) => (
            <Badge key={t} kind="hd">
              {t}
            </Badge>
          ))}
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-sm bg-black/60 px-2 py-1 text-[11px] font-semibold text-primary-light backdrop-blur">
          <CalendarDays className="h-3 w-3" />
          {formatCountdown(match.startsAt)}
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-extrabold text-text-primary backdrop-blur">
            {match.teams[0].short}
          </span>
          <span className="text-xs font-medium text-text-tertiary">vs</span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-extrabold text-text-primary backdrop-blur">
            {match.teams[1].short}
          </span>
          <span className="ml-auto truncate text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
            {match.league}
          </span>
        </div>
        <p className="mt-1 truncate text-base font-bold text-text-primary">{match.title}</p>
        {match.venue && (
          <p className="mt-1 flex items-center gap-1 truncate text-xs text-text-tertiary">
            <MapPin className="h-3 w-3 shrink-0" /> {match.venue}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2">
          <Button variant="gradient" size="sm" radius="full" className="flex-1">
            Remind Me
          </Button>
          <Button
            variant="glass-icon"
            size="sm"
            aria-label="Toggle reminder"
            onPress={() => dispatch(toggleReminder(match.id))}
            className={reminded ? "text-primary border-primary/60" : undefined}
          >
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardBase>
  );
}
