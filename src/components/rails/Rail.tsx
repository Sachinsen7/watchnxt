import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

interface RailProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  children: ReactNode[];
  /** Tailwind width classes applied to each card's flex-basis, e.g. "w-[280px]". */
  itemClassName?: string;
  /** Keep the prev/next arrows visible at all times instead of only on row hover. */
  alwaysShowArrows?: boolean;
}

/**
 * The shared horizontal-scroll rail used across Home/Live Listing (§7, §8).
 * Embla for drag/snap physics, Framer for the stagger-in per §6.1.
 */
export function Rail({ title, subtitle, viewAllHref, children, itemClassName, alwaysShowArrows }: RailProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <motion.section
      className="group/rail relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <SectionHeading title={title} subtitle={subtitle} viewAllHref={viewAllHref} />

      {/* -my-3 cancels the py-3 so section spacing is unaffected — the padding only
          exists to give hover:scale/lift room before the carousel's required
          overflow-hidden clips it. */}
      <div className="-my-3 overflow-hidden py-3" ref={emblaRef}>
        <motion.div
          className="flex gap-5"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {children.map((child, i) => (
            <motion.div
              key={i}
              className={cn("min-w-0 shrink-0 grow-0", itemClassName)}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
              }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {canScrollPrev && (
        <button
          aria-label="Scroll left"
          onClick={() => emblaApi?.scrollPrev()}
          className={cn(
            "absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-surface-raised/90 p-2 text-text-primary shadow-glow-card backdrop-blur transition-opacity md:flex",
            alwaysShowArrows ? "opacity-100" : "opacity-0 group-hover/rail:opacity-100",
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {canScrollNext && (
        <button
          aria-label="Scroll right"
          onClick={() => emblaApi?.scrollNext()}
          className={cn(
            "absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-surface-raised/90 p-2 text-text-primary shadow-glow-card backdrop-blur transition-opacity md:flex",
            alwaysShowArrows ? "opacity-100" : "opacity-0 group-hover/rail:opacity-100",
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </motion.section>
  );
}
