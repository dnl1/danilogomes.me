import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { ProjectGallery } from "@/components/project-gallery";
import type { Locale } from "@/i18n/routing";
import { getContentBySlug, getSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getSlugs("en", "personal-projects");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const { slug } = await params;
  const project = await getContentBySlug(locale, "personal-projects", slug);
  if (!project) return {};

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    alternates: {
      canonical: absoluteUrl(`/personal-projects/${slug}`)
    },
    openGraph: {
      url: absoluteUrl(`/personal-projects/${slug}`),
      images: [{ url: project.frontmatter.image }]
    }
  };
}

export default async function PersonalProjectPage({ params }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("ProjectDetailPage");
  const { slug } = await params;
  const project = await getContentBySlug(locale, "personal-projects", slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-16 md:py-24">
      <article className="mx-auto max-w-4xl">
        <ProjectGallery
          title={t("screenshots")}
          description={t("screenshotsDescription")}
          titlePrefix={t("screenshotAlt", { title: project.frontmatter.title })}
          images={project.frontmatter.screenshots ?? []}
          openLabel={t("openScreenshot")}
          closeLabel={t("closeScreenshot")}
        />

        <p className="font-mono text-sm text-brand">{formatDate(project.frontmatter.date, locale)}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{project.frontmatter.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted">{project.frontmatter.description}</p>

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
      </article>
    </Container>
  );
}
