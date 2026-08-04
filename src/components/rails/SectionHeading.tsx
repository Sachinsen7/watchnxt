import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
}

export function SectionHeading({ title, subtitle, viewAllHref }: SectionHeadingProps) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary md:text-[28px]">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-tertiary transition hover:brightness-110"
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
