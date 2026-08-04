import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";


function withOpacity(variable: string) {
  return ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined
      ? `rgb(var(${variable}))`
      : `rgb(var(${variable}) / ${opacityValue})`;
}

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: withOpacity("--bg-canvas"),
        "canvas-alt": withOpacity("--bg-canvas-alt"),
        surface: withOpacity("--bg-surface"),
        "surface-raised": withOpacity("--bg-surface-raised"),
        sidebar: withOpacity("--bg-sidebar"),
        "border-subtle": withOpacity("--border-subtle"),
        "border-glow": "var(--border-glow)",
        primary: {
          DEFAULT: withOpacity("--accent-primary"),
          light: withOpacity("--accent-primary-light"),
        },
        secondary: {
          DEFAULT: withOpacity("--accent-secondary"),
          muted: withOpacity("--accent-secondary-muted"),
        },
        tertiary: withOpacity("--accent-tertiary"),
        live: {
          DEFAULT: withOpacity("--live-red"),
          dim: "var(--live-red-dim)",
        },
        premium: withOpacity("--premium-gold"),
        free: withOpacity("--free-grey"),
        success: withOpacity("--success"),
        danger: withOpacity("--error"),
        warning: withOpacity("--warning"),
        "text-primary": withOpacity("--text-primary"),
        "text-secondary": withOpacity("--text-secondary"),
        "text-tertiary": withOpacity("--text-tertiary"),
        "text-on-accent": withOpacity("--text-on-accent"),
        sport: {
          cricket: withOpacity("--sport-cricket"),
          football: withOpacity("--sport-football"),
          f1: withOpacity("--sport-f1"),
          tennis: withOpacity("--sport-tennis"),
          kabaddi: withOpacity("--sport-kabaddi"),
          basketball: withOpacity("--sport-basketball"),
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Sora", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "24px",
      },
      boxShadow: {
        "glow-cta": "0 4px 24px rgba(255,106,0,0.4), 0 2px 12px rgba(123,47,247,0.3)",
        "glow-card":
          "0 12px 40px rgba(0,0,0,0.55), 0px 10px 15px -3px rgba(171,101,0,0.2), 0px 4px 6px -4px rgba(171,101,0,0.2)",
        "glow-violet": "0 0 40px rgba(124,58,237,0.35)",
        "glow-border": "0 0 0 1px rgba(168,85,247,0.45), 0 0 24px rgba(124,58,237,0.25)",
      },
      backgroundImage: {
        "gradient-cta": "linear-gradient(90deg, #7B2FF7 0%, #FF6A00 100%)",
        "gradient-brand": "linear-gradient(135deg, #FF3D81 0%, #FF7A1A 35%, #7C3AED 70%, #22D3EE 100%)",
        "gradient-hero-overlay":
          "linear-gradient(90deg, rgba(7,4,13,0.95) 0%, rgba(21,11,36,0.55) 45%, rgba(21,11,36,0.1) 100%)",
        "glow-violet-radial": "radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)",
        "gradient-page-bg": "linear-gradient(180deg, rgb(var(--bg-canvas)) 0%, rgb(var(--bg-canvas-alt)) 100%)",
      },
      keyframes: {
        "live-ping": {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        "live-ping": "live-ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
        shimmer: "shimmer 1.2s linear infinite",
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            background: "#07040D",
            foreground: "#F8F7FB",
            focus: "#22D3EE",
            content1: "#120B1E",
            content2: "#1B1128",
            primary: {
              DEFAULT: "#FF7A1A",
              foreground: "#0B0710",
            },
            secondary: {
              DEFAULT: "#22D3EE",
              foreground: "#0B0710",
            },
            danger: {
              DEFAULT: "#F04438",
              foreground: "#F8F7FB",
            },
          },
        },
      },
    }),
  ],
};

export default config;