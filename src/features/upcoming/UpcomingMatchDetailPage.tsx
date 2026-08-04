import { useParams } from "react-router-dom";
import { Bell, Plus, CalendarPlus, Users, CloudSun } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CardBase } from "@/components/cards/CardBase";
import { PlayerStoryCard } from "@/components/cards/PlayerStoryCard";
import { useGetUpcomingMatchesQuery } from "@/store/api/contentApi";
import { playerStories } from "@/mocks/playerStories";

const metaChips = [
  { label: "Date", value: "24 Oct 2026" },
  { label: "Time", value: "21:00 BST" },
  { label: "Stadium", value: "Emirates" },
  { label: "Location", value: "London" },
  { label: "Audio", value: "EN / ES" },
  { label: "Quality", value: "4K UHD" },
  { label: "Duration", value: "105 Min" },
];

const lineups = {
  home: { formation: "4-3-3", players: ["Raya", "White", "Saliba", "Gabriel", "Zinchenko", "Rice", "Odegaard", "Havertz", "Saka", "Martinelli", "Jesus"] },
  away: { formation: "3-2-4-1", players: ["Ederson", "Akanji", "Dias", "Ake", "Rodri", "Stones", "Silva", "De Bruyne", "Foden", "Grealish", "Haaland"] },
};

const recentForm = {
  home: ["W", "W", "L", "W", "D"],
  away: ["W", "W", "W", "D", "W"],
};

const formColor: Record<string, string> = { W: "bg-success", L: "bg-danger", D: "bg-text-tertiary" };

export function UpcomingMatchDetailPage() {
  const { id } = useParams();
  const { data: matches = [] } = useGetUpcomingMatchesQuery();
  const match = matches.find((m) => m.id === id) ?? matches[0];

  if (!match) return null;

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-4 md:px-10">
        <Breadcrumb
          items={[{ label: "Home", to: "/" }, { label: "Upcoming", to: "/upcoming" }, { label: match.title }]}
        />
      </div>

      <div className="relative mt-6 overflow-hidden">
        <img src={match.thumbnail} alt={match.title} className="h-[520px] w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="flex items-center gap-2">
            <Badge kind="sport">{match.league}</Badge>
            <span className="text-sm text-text-tertiary">Matchweek 15</span>
          </div>

          <div className="flex items-center gap-10">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-danger/20 text-xl font-extrabold text-danger backdrop-blur">
                {match.teams[0].short}
              </div>
              <p className="font-display text-xl font-bold text-text-primary">{match.teams[0].name}</p>
            </div>
            <span className="font-display text-2xl font-bold text-text-tertiary">VS</span>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-xl font-extrabold text-secondary backdrop-blur">
                {match.teams[1].short}
              </div>
              <p className="font-display text-xl font-bold text-text-primary">{match.teams[1].name}</p>
            </div>
          </div>

          <CountdownTimer target={match.startsAt} size="lg" />
          <p className="text-sm text-text-secondary">
            {new Date(match.startsAt).toLocaleDateString()} • {match.venue}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="flat"
              radius="full"
              className="bg-premium px-6 text-canvas shadow-[0_4px_20px_rgba(245,185,61,0.35)] hover:brightness-110"
              startContent={<Bell className="h-4 w-4" />}
            >
              Set Reminder
            </Button>
            <Button variant="flat" radius="full" className="bg-white/10 px-6 text-text-primary" startContent={<Plus className="h-4 w-4" />}>
              Add to My List
            </Button>
            <Button
              variant="flat"
              radius="full"
              className="bg-white/10 px-6 text-text-primary"
              startContent={<CalendarPlus className="h-4 w-4" />}
            >
              Add to Calendar
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-14 px-6 py-12 md:px-10">
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {metaChips.map((c) => (
            <div key={c.label} className="rounded-md border border-white/10 bg-surface px-3 py-3 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wide text-text-tertiary">{c.label}</p>
              <p className="mt-1 text-sm font-bold text-text-primary">{c.value}</p>
            </div>
          ))}
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-text-primary">Probable XI</h2>
            <button className="text-sm font-medium text-tertiary">View Tactical View &gt;</button>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              { team: match.teams[0], data: lineups.home, dot: "bg-danger" },
              { team: match.teams[1], data: lineups.away, dot: "bg-secondary" },
            ].map(({ team, data, dot }) => (
              <div key={team.name} className="rounded-lg border border-white/10 bg-surface p-6 shadow-lg shadow-black/40">
                <div className="mb-4 flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${dot}`} />
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {team.name} ({data.formation})
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {data.players.map((p) => (
                    <div key={p} className="rounded-md bg-surface-raised px-3 py-2 text-sm text-text-secondary">
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-white/10 bg-surface p-6 shadow-lg shadow-black/40">
            <h3 className="mb-4 font-display text-lg font-bold text-text-primary">Head-to-Head</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                ["198", "Meetings"],
                ["98", `${match.teams[0].short} Wins`],
                ["65", `${match.teams[1].short} Wins`],
                ["35", "Draws"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-extrabold text-[#EEDBFF]">{v}</p>
                  <p className="mt-1 text-xs text-text-tertiary">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface p-6 shadow-lg shadow-black/40">
            <h3 className="mb-4 font-display text-lg font-bold text-text-primary">Recent Form</h3>
            {[
              [match.teams[0].short, recentForm.home],
              [match.teams[1].short, recentForm.away],
            ].map(([label, form]) => (
              <div key={label as string} className="mb-3 flex items-center gap-3 last:mb-0">
                <span className="w-10 text-sm font-bold text-text-secondary">{label}</span>
                <div className="flex gap-1.5">
                  {(form as string[]).map((r, i) => (
                    <span
                      key={i}
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${formColor[r]}`}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 font-display text-2xl font-bold text-text-primary">Key Players to Watch</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {playerStories.slice(0, 2).map((s) => (
              <PlayerStoryCard key={s.id} story={s} />
            ))}

            <CardBase>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img src={match.thumbnail} alt={match.venue} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-base font-bold text-text-primary">{match.venue}</p>
                  <div className="mt-2 flex flex-col gap-1 text-[11px] text-text-tertiary">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> Capacity 60,704
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CloudSun className="h-3.5 w-3.5" /> Weather 14°C Clear
                    </span>
                  </div>
                </div>
              </div>
            </CardBase>

            <div className="flex flex-col justify-center rounded-md border border-white/10 bg-surface p-5">
              <p className="text-[11px] font-bold uppercase tracking-wide text-secondary">Match Preview</p>
              <p className="mt-2 font-display text-lg font-bold text-text-primary">"The Title Decider"</p>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                Arteta faces his mentor Guardiola in a clash that could define the season. With only three points
                separating the giants, Arsenal's high-press 4-3-3 meets City's fluid 3-2-4-1 in what promises to be
                a tactical chess match in North London.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-glow-violet-radial p-8 text-center shadow-lg shadow-black/40">
          <h2 className="font-display text-xl font-bold text-text-primary">Match Predictor</h2>
          <p className="mt-1 text-sm text-text-secondary">Who will take the three points tonight?</p>
          <div className="mx-auto mt-6 flex h-2 max-w-xl overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-tertiary" style={{ width: "42%" }} />
            <div className="h-full bg-secondary" style={{ width: "45%" }} />
            <div className="h-full bg-white/20" style={{ width: "13%" }} />
          </div>
          <div className="mx-auto mt-3 flex max-w-xl items-center justify-between text-sm">
            <span className="font-semibold text-tertiary">{match.teams[0].name} 42%</span>
            <span className="font-semibold text-secondary">{match.teams[1].name} 45%</span>
            <span className="font-semibold text-text-tertiary">Draw 13%</span>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
