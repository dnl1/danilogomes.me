import Link from "next/link";
import type { MusicFrontmatter } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type MusicCardProps = {
  slug: string;
  data: MusicFrontmatter;
  locale: string;
};

export function MusicCard({ slug, data, locale }: MusicCardProps) {
  return (
    <Link
      href={`/music/${slug}`}
      className="group rounded-xl border border-line/80 bg-black/20 p-5 transition hover:border-brand/80 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <p className="mb-2 font-mono text-xs text-muted">{formatDate(data.date, locale)}</p>
      <h3 className="text-xl font-semibold tracking-tight group-hover:text-brand">{data.title}</h3>
      <p className="mt-3 text-sm text-muted">{data.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {data.tags.map((tag) => (
          <span key={tag} className="rounded-md border border-line/80 px-2 py-1 font-mono text-xs">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
