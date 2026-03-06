import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { SpotifyRelease } from "@/lib/spotify";

type SpotifyReleaseCardProps = {
  release: SpotifyRelease;
};

export function SpotifyReleaseCard({ release }: SpotifyReleaseCardProps) {
  return (
    <a
      href={release.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-2xl border border-line/80 bg-black/20 p-4 transition hover:border-brand/80 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <div className="flex items-start gap-4">
        <Image
          src={release.image}
          alt={release.title}
          width={96}
          height={96}
          className="h-20 w-20 rounded-xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs text-brand">spotify.release</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight group-hover:text-brand">{release.title}</h3>
          <p className="mt-2 text-sm text-muted">{release.subtitle}</p>
        </div>
        <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted transition group-hover:text-fg" aria-hidden="true" />
      </div>
    </a>
  );
}
