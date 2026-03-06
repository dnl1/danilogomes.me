import type { ComponentType } from "react";

type EmbedProps = {
  url: string;
  title?: string;
};

function EmbedFrame({ url, title = "Embedded media" }: EmbedProps) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-line/80">
      <iframe
        src={url}
        title={title}
        className="h-[380px] w-full"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox allow-presentation"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export function SpotifyEmbed({ url }: EmbedProps) {
  return <EmbedFrame url={url} title="Spotify embed" />;
}

export function SoundCloudEmbed({ url }: EmbedProps) {
  return <EmbedFrame url={url} title="SoundCloud embed" />;
}

export function YouTubeEmbed({ url }: EmbedProps) {
  return <EmbedFrame url={url} title="YouTube embed" />;
}

export const mdxComponents: Record<string, ComponentType<EmbedProps>> = {
  SpotifyEmbed,
  SoundCloudEmbed,
  YouTubeEmbed
};
