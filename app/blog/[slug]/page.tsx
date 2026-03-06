import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import type { Locale } from "@/i18n/routing";
import { getContentBySlug, getSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getSlugs("en", "blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const { slug } = await params;
  const post = await getContentBySlug(locale, "blog", slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: absoluteUrl(`/blog/${slug}`)
    },
    openGraph: {
      url: absoluteUrl(`/blog/${slug}`),
      images: [{ url: post.frontmatter.image }]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const locale = (await getLocale()) as Locale;
  const layoutT = await getTranslations("Layout");
  const { slug } = await params;
  const post = await getContentBySlug(locale, "blog", slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="py-16 md:py-24">
      <BackButton label={layoutT("back")} fallbackHref="/blog" />
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-sm text-brand">{formatDate(post.frontmatter.date, locale)}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{post.frontmatter.title}</h1>
        <p className="mt-4 text-lg text-muted">{post.frontmatter.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.frontmatter.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-line/80 px-2 py-1 font-mono text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="prose mt-10 max-w-none">{post.content}</div>
      </article>
    </Container>
  );
}
