interface TrendingPosterCardProps {
  rank: number;
  title: string;
  thumbnail: string;
}

export function TrendingPosterCard({ rank, title, thumbnail }: TrendingPosterCardProps) {
  return (
    <div className="relative flex items-end">
      <span
        aria-hidden
        className="font-display select-none pr-2 text-[9rem] font-black leading-none text-text-primary/15"
      >
        {rank}
      </span>
      <div className="group -ml-6 aspect-[2/3] w-[180px] shrink-0 overflow-hidden rounded-md shadow-glow-card transition-transform duration-200 hover:scale-[1.03]">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:brightness-110"
        />
      </div>
    </div>
  );
}
