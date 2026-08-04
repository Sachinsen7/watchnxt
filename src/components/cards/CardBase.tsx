import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode, MouseEventHandler } from "react";

const MotionCard = motion(Card);

interface CardBaseProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

/** Every card variant in §7 wraps this. Hover = interactive, per DESIGN_SYSTEM.md §6.2. */
export function CardBase({ children, className, onClick }: CardBaseProps) {
  return (
    <MotionCard
      shadow="none"
      disableRipple
      isPressable={!!onClick}
      onPress={onClick as unknown as () => void}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-md border border-white/10 bg-surface outline-none",
        "hover:z-20 hover:shadow-glow-card",
        className,
      )}
    >
      {children}
    </MotionCard>
  );
}
