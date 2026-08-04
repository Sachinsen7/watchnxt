import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Eye } from "lucide-react";
import { formatCount } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  watchingCount?: number;
}

export function Breadcrumb({ items, watchingCount }: BreadcrumbProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-text-tertiary">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {item.to ? (
              <Link to={item.to} className="hover:text-text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-text-primary">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
      {watchingCount !== undefined && (
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-surface-raised px-3 py-1.5 text-xs font-semibold text-text-secondary">
          <Eye className="h-3.5 w-3.5" /> {formatCount(watchingCount)} Watching
        </span>
      )}
    </div>
  );
}
