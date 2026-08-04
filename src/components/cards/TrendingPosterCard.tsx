interface TrendingPosterCardProps {
  rank: number;
  title: string;
  thumbnail: string;
  badge?: string;
}

export function TrendingPosterCard({ rank, title, thumbnail, badge = "Recently Added" }: TrendingPosterCardProps) {
  return (
    <div className="relative flex items-end">
      <span
        aria-hidden
        className="font-display select-none pr-1 text-[9rem] font-black leading-none text-tertiary/35 [-webkit-text-stroke:2px_rgb(var(--accent-tertiary)/0.6)]"
      >
        {rank}
      </span>
      <div className="group -ml-5 aspect-[2/3] w-[180px] shrink-0 overflow-hidden rounded-md shadow-glow-card transition-transform duration-200 hover:scale-[1.03]">
        <div className="relative h-full w-full">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition duration-300 group-hover:brightness-110"
          />
          <span className="absolute inset-x-0 bottom-0 bg-live py-1.5 text-center text-[11px] font-bold uppercase tracking-wide text-white">
            {badge}
          </span>
        </div>
      </div>
    </div>
  );
}
