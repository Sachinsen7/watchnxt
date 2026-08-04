import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Heart, MessageCircle, Share2, ListPlus, Pause, Play, Volume2, Maximize, ChevronUp, ChevronDown } from "lucide-react";
import { TopBar } from "@/components/nav/TopBar";
import { Button } from "@/components/ui/Button";
import { useGetShortsQuery } from "@/store/api/contentApi";
import { formatCount } from "@/lib/utils";
import { img } from "@/mocks/sports";

const comments = [
  { user: "FanaticFooty", tag: "TOP FAN", text: "This angle makes it look even more impossible. Pure physics defying stuff!", likes: "1.2K" },
  { user: "SkyCityBlue", tag: null, text: "I was at the stadium for this! The sound when the ball hit the net was thunderous.", likes: "842" },
  { user: "TacticalMaster", tag: "PRO", text: "Notice the movement of the defenders — ridiculous technique.", likes: "315" },
];

export function ShortsFeedPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: shorts = [] } = useGetShortsQuery();
  const short = shorts.find((s) => s.id === id) ?? shorts[0];
  const [playing, setPlaying] = useState(true);
  const [tab, setTab] = useState<"comments" | "upnext">("comments");

  if (!short) return null;

  const currentIndex = shorts.findIndex((s) => s.id === short.id);
  const prevShort = currentIndex > 0 ? shorts[currentIndex - 1] : undefined;
  const nextShort = currentIndex >= 0 && currentIndex < shorts.length - 1 ? shorts[currentIndex + 1] : undefined;

  return (
    <div>
      <div className="px-6 pt-4 md:px-10">
        <TopBar />
      </div>

      <div className="flex flex-col items-start justify-center gap-8 px-6 py-10 md:flex-row md:px-10">
        <div className="mx-auto flex items-center gap-4">
          <div className="relative aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-lg bg-black shadow-glow-card sm:max-w-[460px] md:h-[calc(100vh-160px)] md:w-auto">
          <img src={short.thumbnail} alt={short.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />

          <div className="absolute left-4 right-16 top-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-surface-raised" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-text-primary">WatchNXT Official</p>
              <p className="text-xs text-text-tertiary">{formatCount(short.views)} Views</p>
            </div>
            <Button variant="flat" size="sm" radius="full" className="shrink-0 bg-white/15 text-text-primary">
              Follow
            </Button>
          </div>

          <div className="absolute right-3 top-1/3 flex flex-col items-center gap-5">
            <button className="flex flex-col items-center gap-1 text-text-primary">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 backdrop-blur">
                <Heart className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold">{formatCount(short.likes)}</span>
            </button>
            <button
              onClick={() => setTab("comments")}
              className="flex flex-col items-center gap-1 text-text-primary"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 backdrop-blur">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold">3.8K</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-text-primary">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 backdrop-blur">
                <Share2 className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold">Share</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-text-primary">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 backdrop-blur">
                <ListPlus className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold">Save</span>
            </button>
          </div>

          <div className="absolute inset-x-4 bottom-14">
            <p className="font-display text-lg font-bold text-text-primary">{short.title}</p>
            <p className="mt-1 text-xs text-secondary">#{short.category.replace(/\s+/g, "")} #WatchNXT</p>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-black/40 px-4 py-2 backdrop-blur">
            <button onClick={() => setPlaying((p) => !p)} className="text-text-primary">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <Volume2 className="h-4 w-4 text-text-primary" />
            <div className="h-1 flex-1 rounded-full bg-white/20">
              <div className="h-full w-2/3 rounded-full bg-gradient-cta" />
            </div>
            <Maximize className="h-4 w-4 text-text-primary" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => prevShort && navigate(`/shorts/${prevShort.id}`)}
            disabled={!prevShort}
            aria-label="Previous short"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-raised text-text-primary transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
          <button
            onClick={() => nextShort && navigate(`/shorts/${nextShort.id}`)}
            disabled={!nextShort}
            aria-label="Next short"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-raised text-text-primary transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
        </div>

        <div className="w-full max-w-md rounded-lg border border-white/10 bg-surface p-5">
          <div className="mb-4 flex gap-6 border-b border-transparent text-sm font-semibold">
            <button
              onClick={() => setTab("comments")}
              className={tab === "comments" ? "border-b-2 border-secondary pb-2 text-text-primary" : "pb-2 text-text-tertiary"}
            >
              Comments
            </button>
            <button
              onClick={() => setTab("upnext")}
              className={tab === "upnext" ? "border-b-2 border-secondary pb-2 text-text-primary" : "pb-2 text-text-tertiary"}
            >
              Up Next
            </button>
          </div>

          {tab === "comments" ? (
            <div className="flex flex-col gap-4">
              {comments.map((c) => (
                <div key={c.user} className="flex gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-surface-raised" />
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      {c.user}
                      {c.tag && (
                        <span className="rounded-sm bg-secondary/20 px-1.5 py-0.5 text-[10px] font-bold text-secondary">
                          {c.tag}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">{c.text}</p>
                    <p className="mt-1 text-xs text-text-tertiary">{c.likes} likes • Reply</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {shorts.slice(0, 4).map((s) => (
                <div key={s.id} className="flex gap-3">
                  <img src={img(`up-${s.id}`, 160, 90)} alt="" className="h-14 w-20 shrink-0 rounded-md object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text-primary">{s.title}</p>
                    <p className="text-xs text-text-tertiary">{formatCount(s.views)} views</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
