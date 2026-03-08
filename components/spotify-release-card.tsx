"use client";

import Image from "next/image";
import { ExternalLink, Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useMusicPreviewVolume } from "@/components/music-preview-volume";
import type { SpotifyRelease } from "@/lib/spotify";

type SpotifyReleaseCardProps = {
  release: SpotifyRelease;
};

export function SpotifyReleaseCard({ release }: SpotifyReleaseCardProps) {
  const t = useTranslations("MusicPage");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { volume, activePreviewId, setActivePreviewId } = useMusicPreviewVolume();

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
      if (activePreviewId === release.id) {
        setActivePreviewId(null);
      }
    }

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [activePreviewId, release.id, setActivePreviewId]);

  useEffect(() => {
    if (!audioRef.current || !isPlaying) {
      return;
    }

    if (activePreviewId && activePreviewId !== release.id) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [activePreviewId, isPlaying, release.id]);

  async function togglePlayback() {
    if (!audioRef.current || !release.previewUrl) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (activePreviewId === release.id) {
        setActivePreviewId(null);
      }
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setActivePreviewId(release.id);
    } catch {
      setIsPlaying(false);
    }
  }

  return (
    <article className="group rounded-2xl border border-line/80 bg-black/20 p-4 transition hover:border-brand/80 hover:shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
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
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-full border border-line/80 text-muted transition hover:border-brand hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:mt-1"
          aria-label={t("openSpotify")}
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
