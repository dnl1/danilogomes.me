import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { BackButton } from "@/components/back-button";
import { BlogCard } from "@/components/blog-card";
import { Container } from "@/components/container";
import type { Locale } from "@/i18n/routing";
import { getCollection } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("BlogPage");

  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/blog"
  });
}

export default async function BlogPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("BlogPage");
  const layoutT = await getTranslations("Layout");
  const posts = await getCollection(locale, "blog");

  return (
    <Container className="py-16 md:py-24">
      <BackButton label={layoutT("back")} />
      <header className="mb-10 max-w-2xl">
        <p className="font-mono text-sm text-brand">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{t("heading")}</h1>
        <p className="mt-4 text-muted">{t("intro")}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} slug={post.slug} data={post.frontmatter} locale={locale} />
        ))}
      </div>
    </Container>
  );
}
