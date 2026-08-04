import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/** Same scroll-into-view fade/slide used by Rail (§6.1), for the non-carousel grid sections. */
export function RevealSection({ children, className, id }: RevealSectionProps) {
  return (
    <motion.section
      id={id}
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
