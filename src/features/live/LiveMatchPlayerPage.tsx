import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Play,
  Pause,
  ThumbsUp,
  Share2,
  ListPlus,
  Cast,
  Download,
  Award,
  ChevronRight,
  Volume2,
  Globe,
  Settings,
  PictureInPicture2,
  Maximize,
} from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AudioCommentaryModal } from "@/components/player/AudioCommentaryModal";
import { StreamQualityModal } from "@/components/player/StreamQualityModal";
import { useGetLiveMatchesQuery, useGetHighlightsQuery } from "@/store/api/contentApi";

export function LiveMatchPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: matches = [] } = useGetLiveMatchesQuery();
  const { data: highlights = [] } = useGetHighlightsQuery();
  const match = matches.find((m) => m.id === id) ?? matches[0];
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [qualityModalOpen, setQualityModalOpen] = useState(false);

  if (!match) return null;

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="px-6 pt-4 md:px-10">
        <Breadcrumb
          items={[{ label: "Home", to: "/" }, { label: "Live", to: "/live" }, { label: match.league }, { label: match.title }]}
          watchingCount={match.viewerCount}
        />
      </div>

      <div className="px-6 py-6 md:px-10">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          <img src={match.thumbnail} alt={match.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <Play className="h-6 w-6 fill-white text-white" />
            </span>
          </div>
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <Badge kind="live">Live</Badge>
            {match.tags?.includes("4K UHD") && <Badge kind="4k">4K</Badge>}
            <Badge kind="neutral">HDR</Badge>
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
                <button
                  onClick={() => setAudioModalOpen(true)}
                  aria-label="Audio & Commentary"
                  className="text-white/80 transition-colors hover:text-white"
                >
                  <Globe className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setQualityModalOpen(true)}
                  aria-label="Stream Quality"
                  className="text-white/80 transition-colors hover:text-white"
                >
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

        <AudioCommentaryModal
          isOpen={audioModalOpen}
          onClose={() => setAudioModalOpen(false)}
          matchTitle={match.title}
          thumbnail={match.thumbnail}
        />
        <StreamQualityModal
          isOpen={qualityModalOpen}
          onClose={() => setQualityModalOpen(false)}
          matchTitle={match.title}
          thumbnail={match.thumbnail}
        />

        <div className="mt-4 flex items-center justify-between gap-4 rounded-md border border-premium/20 bg-premium/10 p-4">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-premium/20">
              <Award className="h-5 w-5 text-premium" />
            </span>
            <div>
              <p className="font-semibold text-premium">Upgrade to WatchNXT Premium</p>
              <p className="text-sm text-text-secondary">
                Enjoy ad-free streaming, 4K multi-cam angles, and exclusive player stats.
              </p>
            </div>
          </div>
          <Button variant="gradient" radius="full" className="shrink-0 px-6" onPress={() => navigate("/premium")}>
            Upgrade Now
          </Button>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-surface p-6 shadow-lg shadow-black/40 sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <p className="font-display text-4xl font-extrabold text-text-primary">{match.teams[0].short}</p>
                <p className="text-base text-text-tertiary">({match.scoreSubLine})</p>
              </div>
              <p className="mt-2 font-display text-5xl font-extrabold leading-none text-text-primary sm:text-6xl">
                {match.scoreLine}
              </p>
              <p className="mt-3 text-base font-medium text-secondary">
                {match.teams[0].name} needs 42 runs in 44 balls
              </p>
            </div>

            <div className="hidden h-24 w-px shrink-0 bg-white/10 lg:block" />

            <div className="flex flex-wrap items-center gap-8">
              <div>
                <p className="text-sm font-semibold text-text-tertiary">CRR</p>
                <p className="mt-1 text-2xl font-bold text-text-primary">6.66</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-tertiary">RRR</p>
                <p className="mt-1 text-2xl font-bold text-text-primary">5.73</p>
              </div>
              <div className="rounded-2xl bg-primary/15 px-5 py-3 text-center">
                <p className="text-xs font-bold uppercase tracking-wide text-tertiary">Boundaries</p>
                <p className="mt-1 text-lg font-bold text-text-primary">24 (4s) | 12 (6s)</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface-raised p-5 lg:w-64">
              <p className="text-center text-xs font-bold uppercase tracking-wide text-text-secondary">
                Current Partnership
              </p>
              <p className="mt-2 text-center font-display text-3xl font-extrabold text-text-primary">76 (44)</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-tertiary" />
              </div>
              <p className="mt-3 truncate text-center text-xs text-text-tertiary">Kohli 42 (26) | Pandya 32 (18)</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-surface-raised p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-base text-text-primary">V. Kohli*</p>
                <p className="font-display text-3xl font-extrabold text-tertiary">
                  84 <span className="text-base font-normal text-text-tertiary">(68)</span>
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-text-tertiary">
                <span>4s: 8</span>
                <span>6s: 2</span>
                <span>SR: 123.5</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-surface-raised p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-base text-text-primary">H. Pandya</p>
                <p className="font-display text-3xl font-extrabold text-text-primary">
                  32 <span className="text-base font-normal text-text-tertiary">(24)</span>
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-text-tertiary">
                <span>4s: 3</span>
                <span>6s: 1</span>
                <span>SR: 133.3</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-surface-raised p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-base text-text-primary">P. Cummins</p>
                <p className="font-display text-3xl font-extrabold text-sport-f1">
                  2/64 <span className="text-base font-normal text-text-tertiary">(8.4)</span>
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-text-tertiary">
                <span>Dots: 18</span>
                <span>Econ: 7.3</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="flat" radius="full" className="bg-surface-raised text-text-primary" startContent={<ThumbsUp className="h-4 w-4" />}>
              1.2M
            </Button>
            <Button variant="flat" radius="full" className="bg-surface-raised text-text-primary" startContent={<Share2 className="h-4 w-4" />}>
              Share
            </Button>
            <Button variant="flat" radius="full" className="bg-surface-raised text-text-primary" startContent={<ListPlus className="h-4 w-4" />}>
              Save
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="flat" radius="full" className="bg-surface-raised text-text-primary" startContent={<Cast className="h-4 w-4" />}>
              Cast
            </Button>
            <Button variant="flat" radius="full" className="bg-surface-raised text-text-primary" startContent={<Download className="h-4 w-4" />}>
              Download
            </Button>
          </div>
        </div>

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-text-primary">Related Content</h2>
            <Link
              to="/highlights"
              className="flex items-center gap-1 text-sm font-medium text-tertiary transition hover:brightness-110"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <Link key={h.id} to={`/highlights/${h.id}`} className="block">
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                  <img src={h.thumbnail} alt={h.title} className="h-full w-full object-cover" />
                  <div className="absolute bottom-2 right-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                    {h.duration}
                  </div>
                </div>
                <div className="pt-3">
                  <p className="truncate text-sm font-semibold text-text-primary">{h.title}</p>
                  <p className="mt-1 truncate text-xs text-text-tertiary">
                    {h.resultLine} • {h.postedAgo}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
