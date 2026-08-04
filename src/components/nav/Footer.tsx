import { Link } from "react-router-dom";
import { Input } from "@heroui/react";
import { QrCode, Camera, Twitter, Youtube, Users2 } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us" },
      { label: "Careers" },
      { label: "Press" },
      { label: "Partners" },
      { label: "Investors" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Centre", to: "/support" },
      { label: "FAQs", to: "/support" },
      { label: "Contact Us", to: "/support" },
      { label: "Report an Issue", to: "/support/raise-ticket" },
      { label: "Compatibility" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy" },
      { label: "Terms & Conditions" },
      { label: "Cookie Policy" },
      { label: "Refund Policy" },
    ],
  },
];

const socials = [QrCode, Camera, Twitter, Youtube, Users2];

export function Footer() {
  return (
    <footer className="bg-surface px-6 py-14 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-text-secondary">
            Your Ultimate Destination for Live Sports, Exclusive Shows, Highlights, Shorts, and
            Premium Sports Entertainment.
          </p>
          <div className="mt-4 flex gap-2">
            {socials.map((Icon, i) => (
              <button
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-secondary hover:shadow-glow-card"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary">
              {col.title}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.to ? (
                    <Link to={l.to} className="text-sm text-text-secondary hover:text-text-primary">
                      {l.label}
                    </Link>
                  ) : (
                    <a href="#" className="text-sm text-text-secondary hover:text-text-primary">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary">
            Stay Updated
          </h4>
          <div className="mt-4 flex flex-col gap-2">
            <Input
              placeholder="Your email address"
              radius="full"
              classNames={{
                inputWrapper: "bg-surface-raised",
                input: "bg-transparent appearance-none text-text-primary placeholder:text-text-tertiary",
              }}
            />
            <Button variant="gradient" radius="full">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 pt-6 text-xs text-text-tertiary md:flex-row">
        <span>© {new Date().getFullYear()} WatchNXT. All Rights Reserved.</span>
        <div className="flex gap-4">
          <span>English (US)</span>
          <span>Global Region</span>
        </div>
      </div>
    </footer>
  );
}
