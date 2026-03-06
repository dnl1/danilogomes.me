import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import type { Locale } from "@/i18n/routing";
import { getContentBySlug, getSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getSlugs("en", "projects");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const { slug } = await params;
  const project = await getContentBySlug(locale, "projects", slug);
  if (!project) return {};

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    alternates: {
      canonical: absoluteUrl(`/projects/${slug}`)
    },
    openGraph: {
      url: absoluteUrl(`/projects/${slug}`),
      images: [{ url: project.frontmatter.image }]
    }
  };
}

export default async function ProjectPage({ params }: Props) {
  const locale = (await getLocale()) as Locale;
  const { slug } = await params;
  const t = await getTranslations("ProjectDetailPage");
  const project = await getContentBySlug(locale, "projects", slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-16 md:py-24">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-sm text-brand">{formatDate(project.frontmatter.date, locale)}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{project.frontmatter.title}</h1>
        <p className="mt-4 text-lg text-muted">{project.frontmatter.description}</p>

        <div className="mt-8 grid gap-4 rounded-xl border border-line/80 bg-black/20 p-5 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs text-muted">{t("company")}</p>
            <p className="mt-1 text-sm">{project.frontmatter.company}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-muted">{t("techStack")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.frontmatter.techStack.map((tech) => (
                <span key={tech} className="rounded-md border border-line/80 px-2 py-1 font-mono text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="prose mt-10 max-w-none">{project.content}</div>

        {project.frontmatter.screenshots?.length ? (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight">{t("screenshots")}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {project.frontmatter.screenshots.map((image) => (
                <div key={image} className="overflow-hidden rounded-xl border border-line/80">
                  <Image
                    src={image}
                    alt={t("screenshotAlt", { title: project.frontmatter.title })}
                    width={1200}
                    height={700}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </Container>
  );
}
