import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FaAmazon } from "react-icons/fa6";
import type { IconBaseProps } from "react-icons";
import { SiInstagram, SiSoundcloud, SiSpotify, SiTidal, SiYoutubemusic } from "react-icons/si";
import { siDeezer } from "simple-icons";
import { Container } from "@/components/container";
import { FollowPlatforms, type FollowPlatformItem } from "@/components/follow-platforms";
import { MusicPlatforms, type MusicPlatformItem } from "@/components/music-platforms";
import { SpotifyReleaseCard } from "@/components/spotify-release-card";
import { buildMetadata } from "@/lib/metadata";
import { getLatestSpotifyReleasesByArtist } from "@/lib/spotify";

export const dynamic = "force-dynamic";

function DeezerIcon({ className }: IconBaseProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={siDeezer.path} />
    </svg>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("MusicPage");

  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/music"
  });
}

export default async function MusicPage() {
  const t = await getTranslations("MusicPage");
  const [dnl1Releases, undercolinReleases] = await Promise.all([
    getLatestSpotifyReleasesByArtist("dnl1").catch(() => []),
    getLatestSpotifyReleasesByArtist("undercolin").catch(() => [])
  ]);
  const dnl1Platforms: MusicPlatformItem[] = [
    {
      name: "YouTube Music",
      href: "https://music.youtube.com/channel/UCoOtJ5YTZ2RiSAVlRHfJx-g",
      icon: SiYoutubemusic
    },
    {
      name: "Spotify",
      href: "https://open.spotify.com/artist/7IbyntkWwrrsRd9RSTRo8J",
      icon: SiSpotify
    },
    {
      name: "Amazon Music",
      href: "https://music.amazon.com/artists/B0GK57QD1P/dnl1",
      icon: FaAmazon
    },
    {
      name: "Deezer",
      href: "https://www.deezer.com/en/artist/369909012",
      icon: DeezerIcon
    },
    {
      name: "TIDAL",
      href: "https://tidal.com/artist/73668378",
      icon: SiTidal
    },
    {
      name: "SoundCloud",
      href: "https://soundcloud.com/danilo-oliveira-200150512",
      icon: SiSoundcloud
    }
  ];
  const dnl1FollowPlatforms: FollowPlatformItem[] = [
    {
      name: "Instagram",
      href: "https://instagram.com/dnl1",
      icon: SiInstagram
    },
    {
      name: "SoundCloud",
      href: "https://soundcloud.com/danilo-oliveira-200150512",
      icon: SiSoundcloud
    },
    {
      name: "Spotify",
      href: "https://open.spotify.com/artist/7IbyntkWwrrsRd9RSTRo8J",
      icon: SiSpotify
    },
    {
      name: "YouTube Music",
      href: "https://music.youtube.com/channel/UCoOtJ5YTZ2RiSAVlRHfJx-g",
      icon: SiYoutubemusic
    },
    {
      name: "Instagram - Undercolin",
      href: "https://www.instagram.com/undercolin/",
      icon: SiInstagram
    }
  ];

  return (
    <Container className="py-16 md:py-24">
      <header className="mb-10 max-w-3xl">
        <p className="font-mono text-sm text-brand">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{t("heading")}</h1>
        <p className="mt-4 text-muted">{t("intro")}</p>
      </header>

      <section className="mb-12 rounded-2xl border border-line/80 bg-black/20 p-6">
        <p className="max-w-3xl text-sm leading-7 text-muted">{t("externalDescription")}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <a
            href="https://open.spotify.com/intl-pt/artist/7IbyntkWwrrsRd9RSTRo8J"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-line/80 bg-black/20 p-5 transition hover:border-brand/80 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <p className="font-mono text-xs text-brand">{t("dnl1Label")}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight group-hover:text-brand">{t("dnl1Title")}</h2>
            <p className="mt-3 text-sm text-muted">{t("dnl1Description")}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-fg">
              {t("openSpotify")}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>

          <a
            href="https://open.spotify.com/intl-pt/artist/6nwROjcnQdTIbv2zIu6Frn"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-line/80 bg-black/20 p-5 transition hover:border-brand/80 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <p className="font-mono text-xs text-brand">{t("undercolinLabel")}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight group-hover:text-brand">
              {t("undercolinTitle")}
            </h2>
            <p className="mt-3 text-sm text-muted">{t("undercolinDescription")}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-fg">
              {t("openSpotify")}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </section>

      <FollowPlatforms
        title={t("followOn")}
        description={t("followOnDescription")}
        platforms={dnl1FollowPlatforms}
        className="mb-12"
      />

      <section className="mb-12">
        <div className="mb-6">
          <h2 className="font-mono text-lg text-brand">{t("latestSpotifyDnl1")}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {dnl1Releases.length ? t("latestSpotifyDescription") : t("latestSpotifyFallback")}
          </p>
        </div>
        {dnl1Releases.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {dnl1Releases.map((release) => (
              <SpotifyReleaseCard key={release.id} release={release} />
            ))}
          </div>
        ) : null}
      </section>

      <section>
        <div className="mb-6">
          <h2 className="font-mono text-lg text-brand">{t("latestSpotifyUndercolin")}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {undercolinReleases.length ? t("latestSpotifyUndercolinDescription") : t("latestSpotifyFallback")}
          </p>
        </div>
        {undercolinReleases.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {undercolinReleases.map((release) => (
              <SpotifyReleaseCard key={release.id} release={release} />
            ))}
          </div>
        ) : null}
      </section>

      <MusicPlatforms
        title={t("listenEverywhere")}
        description={t("listenEverywhereDescription")}
        platforms={dnl1Platforms}
        className="mt-12"
      />
    </Container>
  );
}
