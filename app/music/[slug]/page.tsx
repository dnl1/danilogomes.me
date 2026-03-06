import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { SpotifyEmbed, SoundCloudEmbed, YouTubeEmbed } from "@/components/mdx";
import type { Locale } from "@/i18n/routing";
import { getContentBySlug, getSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getSlugs("en", "music");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const { slug } = await params;
  const track = await getContentBySlug(locale, "music", slug);
  if (!track) return {};

  return {
    title: track.frontmatter.title,
    description: track.frontmatter.description,
    alternates: {
      canonical: absoluteUrl(`/music/${slug}`)
    },
    openGraph: {
      url: absoluteUrl(`/music/${slug}`),
      images: [{ url: track.frontmatter.image }]
    }
  };
}

export default async function MusicDetailsPage({ params }: Props) {
  const locale = (await getLocale()) as Locale;
  const { slug } = await params;
  const track = await getContentBySlug(locale, "music", slug);

  if (!track) {
    notFound();
  }

  return (
    <Container className="py-16 md:py-24">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-sm text-brand">{formatDate(track.frontmatter.date, locale)}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{track.frontmatter.title}</h1>
        <p className="mt-4 text-lg text-muted">{track.frontmatter.description}</p>

        <div className="prose mt-10 max-w-none">{track.content}</div>

        <section className="mt-10 space-y-6">
          {track.frontmatter.spotifyUrl ? <SpotifyEmbed url={track.frontmatter.spotifyUrl} /> : null}
          {track.frontmatter.soundcloudUrl ? <SoundCloudEmbed url={track.frontmatter.soundcloudUrl} /> : null}
          {track.frontmatter.youtubeUrl ? <YouTubeEmbed url={track.frontmatter.youtubeUrl} /> : null}
        </section>
      </article>
    </Container>
  );
}
