import { motion } from "framer-motion";
import { Play, Heart, Bell } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Match } from "@/types/content";

interface HeroBannerProps {
  match: Match;
  variant?: "fullbleed" | "framed";
}

const textVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

export function HeroBanner({ match, variant = "fullbleed" }: HeroBannerProps) {
  const framed = variant === "framed";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        framed ? "rounded-lg border border-border-subtle" : "",
      )}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.06] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      >
        <img src={match.thumbnail} alt={match.title} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent" />

      <div className={cn("relative flex flex-col justify-end gap-4 p-8", framed ? "min-h-[380px] md:p-10" : "min-h-[520px] md:min-h-[600px] md:p-16")}>
        <motion.div custom={0} initial="hidden" animate="visible" variants={textVariants}>
          <Badge kind="live">Live Now</Badge>
        </motion.div>

        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary"
        >
          {match.league}
        </motion.p>

        <motion.h1
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className={cn(
            "font-display font-extrabold uppercase leading-[1.05] text-text-primary",
            framed ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl",
          )}
        >
          {match.title}
        </motion.h1>

        {!framed && (
          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="max-w-xl text-sm text-text-secondary md:text-base"
          >
            The greatest rivalry in sport reaches its boiling point. Witness every moment in
            stunning 4K HDR, live as it happens.
          </motion.p>
        )}

        {framed && match.scoreLine && (
          <motion.div custom={3} initial="hidden" animate="visible" variants={textVariants} className="flex gap-8">
            <div>
              <p className="text-xs uppercase text-text-tertiary">{match.teams[0].name}</p>
              <p className="text-2xl font-extrabold text-text-primary">{match.scoreLine}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-text-tertiary">{match.teams[1].name}</p>
              <p className="text-2xl font-extrabold text-text-tertiary">{match.scoreSubLine}</p>
            </div>
          </motion.div>
        )}

        {!framed && match.tags && (
          <motion.div custom={4} initial="hidden" animate="visible" variants={textVariants} className="flex flex-wrap gap-2">
            {match.tags.map((t) => (
              <Badge key={t} kind="hd">
                {t}
              </Badge>
            ))}
          </motion.div>
        )}

        <motion.div custom={5} initial="hidden" animate="visible" variants={textVariants} className="flex items-center gap-3">
          <Button variant="gradient" size="lg" radius="md" startContent={<Play className="h-4 w-4 fill-current" />}>
            Watch Live
          </Button>
          {framed && (
            <>
              <Button variant="glass-icon" aria-label="Save">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="glass-icon" aria-label="Remind me">
                <Bell className="h-4 w-4" />
              </Button>
            </>
          )}
        </motion.div>
      </div>

      {framed && match.tags && (
        <div className="absolute right-4 top-4 hidden flex-col gap-2 md:flex">
          {match.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border-subtle bg-black/50 px-3 py-1.5 text-center text-[10px] font-bold uppercase tracking-wide text-text-secondary backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
