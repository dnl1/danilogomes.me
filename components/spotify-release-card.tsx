"use client";

import Image from "next/image";
import { ExternalLink, Pause, Play, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import type { SpotifyRelease } from "@/lib/spotify";

type SpotifyReleaseCardProps = {
  release: SpotifyRelease;
};

export function SpotifyReleaseCard({ release }: SpotifyReleaseCardProps) {
  const t = useTranslations("MusicPage");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    function handleEnded() {
      setIsPlaying(false);
    }

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  async function togglePlayback() {
    if (!audioRef.current || !release.previewUrl) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  return (
    <article className="group rounded-2xl border border-line/80 bg-black/20 p-4 transition hover:border-brand/80 hover:shadow-soft">
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

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {release.previewUrl ? (
              <>
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-black/30 px-3 py-2 text-sm transition hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label={isPlaying ? t("pausePreview") : t("playPreview")}
                >
                  {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
                  <span>{isPlaying ? t("pausePreview") : t("playPreview")}</span>
                </button>

                <label className="inline-flex items-center gap-2 text-sm text-muted">
                  <Volume2 className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{t("volume")}</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(event) => setVolume(Number(event.target.value))}
                    className="accent-brand"
                    aria-label={t("volume")}
                  />
                </label>
                <audio ref={audioRef} src={release.previewUrl} preload="none" />
              </>
            ) : (
              <p className="text-sm text-muted">{t("previewUnavailable")}</p>
            )}
          </div>
        </div>
        <a
          href={release.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line/80 text-muted transition hover:border-brand hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label={t("openSpotify")}
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
