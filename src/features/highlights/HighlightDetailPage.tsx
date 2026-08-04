import { RevealSection } from "@/components/rails/RevealSection";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Play,
  Pause,
  ThumbsUp,
  Share2,
  Download,
  ListPlus,
  Volume2,
  Settings,
  PictureInPicture2,
  Maximize,
} from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CardBase } from "@/components/cards/CardBase";
import { Rail } from "@/components/rails/Rail";
import { useGetHighlightsQuery } from "@/store/api/contentApi";
import { img } from "@/mocks/sports";

const keyMoments = [
  { time: "02:15", label: "Virat Kohli's First Six", thumb: "moment-1" },
  { time: "08:42", label: "Bumrah's Crucial Wicket", thumb: "moment-2" },
  { time: "12:30", label: "The Turning Point", thumb: "moment-3" },
  { time: "15:05", label: "Winning Moment", thumb: "moment-4" },
];

const moreFromMatch = [
  { title: "Full Match Replay: IND vs AUS", duration: "3:42:15", thumb: "more-1" },
  { title: "Kohli's Farewell Speech", duration: "12:40", thumb: "more-2", badge: "Player Story" },
  { title: "Tactical Analysis: Death Overs", duration: "12:40", thumb: "more-3" },
];

export function HighlightDetailPage() {
  const { id } = useParams();
  const { data: highlights = [] } = useGetHighlightsQuery();
  const highlight = highlights.find((h) => h.id === id) ?? highlights[0];
  const [active, setActive] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!highlight) return null;

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 py-6 md:px-10">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          <img src={highlight.thumbnail} alt={highlight.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-colors hover:bg-white/30"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 fill-white text-white" />
              ) : (
                <Play className="h-6 w-6 fill-white text-white" />
              )}
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-3 pt-10">
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[91%] rounded-full bg-primary" />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying((p) => !p)}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="text-white/90 transition-colors hover:text-white"
                >
                  {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                </button>
                <Volume2 className="h-4 w-4 text-white/80" />
                <span className="text-xs font-medium text-white/80">02:45:12 / 03:00:00</span>
              </div>
              <div className="flex items-center gap-4">
                <button aria-label="Settings" className="text-white/80 transition-colors hover:text-white">
                  <Settings className="h-4 w-4" />
                </button>
                <button aria-label="Picture in picture" className="text-white/80 transition-colors hover:text-white">
                  <PictureInPicture2 className="h-4 w-4" />
                </button>
                <button aria-label="Fullscreen" className="text-white/80 transition-colors hover:text-white">
                  <Maximize className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Badge kind="sport">{highlight.league}</Badge>
          <span className="text-xs text-text-tertiary">4.2M views • Oct 12, 2023</span>
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold text-text-primary">{highlight.title}</h1>

        <div className="mt-4 flex flex-wrap gap-8 border-b border-white/5 pb-5">
          <div>
            <p className="text-[11px] font-bold uppercase text-text-tertiary">Winner</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-text-primary">
              <span className="h-2 w-2 rounded-full bg-danger" /> India
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase text-text-tertiary">Final Score</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-text-primary">
              <span className="h-2 w-2 rounded-full bg-danger" /> 176/7 <span className="text-text-tertiary">vs</span>{" "}
              169/8 <span className="h-2 w-2 rounded-full bg-secondary" />
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase text-text-tertiary">Player of the Match</p>
            <p className="mt-1 text-sm font-bold text-text-primary">Virat Kohli (76 off 59)</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="flat" radius="full" className="bg-surface-raised text-text-primary" startContent={<ThumbsUp className="h-4 w-4" />}>
            128K
          </Button>
          <Button variant="flat" radius="full" className="bg-surface-raised text-text-primary" startContent={<Share2 className="h-4 w-4" />}>
            Share
          </Button>
          <Button variant="flat" radius="full" className="bg-surface-raised text-text-primary" startContent={<Download className="h-4 w-4" />}>
            Download
          </Button>
          <Button variant="flat" radius="full" className="bg-surface-raised text-text-primary" startContent={<ListPlus className="h-4 w-4" />}>
            Save
          </Button>
        </div>

        <div className="mt-6 rounded-md border border-white/10 bg-surface p-5">
          <p className="text-sm leading-relaxed text-text-secondary">
            Witness history as India clinches the T20 World Cup title in a nail-biting thriller against Australia.
            From Virat Kohli's masterclass innings to Jasprit Bumrah's death-over heroics, relive every ball of the
            final.
          </p>
          <button className="mt-2 text-sm font-semibold text-secondary">Show More</button>
        </div>

        <RevealSection className="mt-10">
          <Rail itemClassName="w-[220px]" title="Key Moments">
            {keyMoments.map((m, i) => (
              <button
                key={m.time}
                onClick={() => setActive(i)}
                className={`group block w-full overflow-hidden rounded-md border-2 text-left transition-colors ${
                  active === i ? "border-primary" : "border-transparent hover:border-secondary/50"
                }`}
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={img(m.thumb, 500, 300)}
                    alt={m.label}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <span className="absolute right-2 top-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                    {m.time}
                  </span>
                  <p className="absolute inset-x-2 bottom-2 truncate text-sm font-semibold text-text-primary">
                    {m.label}
                  </p>
                </div>
              </button>
            ))}
          </Rail>
        </RevealSection>

        <RevealSection className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-text-primary">More from this match</h2>
            <button className="text-sm font-medium text-tertiary">View All &gt;</button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {moreFromMatch.map((m) => (
              <CardBase key={m.title}>
                <div className="relative aspect-video w-full overflow-hidden">
                  <img src={img(m.thumb, 700, 400)} alt={m.title} className="h-full w-full object-cover" />
                  {m.badge && (
                    <span className="absolute left-2 top-2 rounded-sm bg-tertiary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-canvas">
                      {m.badge}
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                    {m.duration}
                  </span>
                </div>
                <p className="p-3 text-sm font-semibold text-text-primary">{m.title}</p>
              </CardBase>
            ))}
          </div>
        </RevealSection>
      </div>

      <Footer />
    </div>
  );
}
