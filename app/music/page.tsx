import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { MusicCard } from "@/components/music-card";
import { SpotifyReleaseCard } from "@/components/spotify-release-card";
import type { Locale } from "@/i18n/routing";
import { getCollection } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { getLatestSpotifyReleases } from "@/lib/spotify";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("MusicPage");

  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/music"
  });
}

export default async function MusicPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("MusicPage");
  const [music, spotifyReleases] = await Promise.all([
    getCollection(locale, "music"),
    getLatestSpotifyReleases().catch(() => [])
  ]);

  return (
    <Container className="py-16 md:py-24">
      <header className="mb-10 max-w-2xl">
        <p className="font-mono text-sm text-brand">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{t("heading")}</h1>
        <p className="mt-4 text-muted">{t("intro")}</p>
      </header>

      <section className="mb-12">
        <div className="mb-6">
          <h2 className="font-mono text-lg text-brand">{t("latestSpotify")}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {spotifyReleases.length ? t("latestSpotifyDescription") : t("latestSpotifyFallback")}
          </p>
        </div>
        {spotifyReleases.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {spotifyReleases.map((release) => (
              <SpotifyReleaseCard key={release.id} release={release} />
            ))}
          </div>
        ) : null}
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {music.map((item) => (
          <MusicCard key={item.slug} slug={item.slug} data={item.frontmatter} locale={locale} />
        ))}
      </div>
    </Container>
  );
}
