import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Tv, Languages, MonitorSmartphone, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/nav/Logo";

const trustItems = [
  { icon: Tv, label: "HD Streaming" },
  { icon: Languages, label: "Multi-Language" },
  { icon: MonitorSmartphone, label: "Watch Anywhere" },
  { icon: ShieldCheck, label: "Secure Login" },
];

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-canvas">
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/auth-hero/1600/1200"
          alt=""
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/70 to-canvas-alt/60" />
        <div className="absolute inset-0 bg-glow-violet-radial" />
      </div>

      <div className="relative z-10 flex w-full flex-col justify-between p-8 md:p-14">
        <div className="flex flex-1 flex-col justify-center gap-10 md:flex-row md:items-center md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-lg"
          >
            <Logo />
            <h1 className="font-display mt-8 text-4xl font-extrabold leading-tight text-text-primary md:text-5xl">
              Your Ultimate Sports{" "}
              <span className="text-gradient-brand">Streaming Destination</span>
            </h1>
            <p className="mt-4 text-text-secondary">
              Watch live matches, highlights, exclusive shows, player stories, and premium sports
              content anytime. Experience the roar of the stadium from wherever you are.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="w-full max-w-md shrink-0 rounded-lg bg-surface/95 p-8 shadow-glow-violet backdrop-blur"
          >
            {children}
          </motion.div>
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-3xl flex-wrap items-center justify-center gap-8">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-text-tertiary">
              <Icon className="h-4 w-4 text-secondary" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
