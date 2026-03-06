import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import type { Locale } from "@/i18n/routing";
import { getCollection } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PersonalProjectsPage");

  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/personal-projects"
  });
}

export default async function PersonalProjectsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("PersonalProjectsPage");
  const projects = await getCollection(locale, "personal-projects");

  return (
    <Container className="py-16 md:py-24">
      <header className="mb-10 max-w-4xl">
        <p className="font-mono text-sm text-brand">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{t("heading")}</h1>
        <p className="mt-4 text-muted">{t("intro")}</p>
      </header>

      <section className="rounded-2xl border border-line/80 bg-black/20 p-6">
        <p className="font-mono text-xs text-brand">{t("summaryTitle")}</p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted">{t("summaryDescription")}</p>
      </section>

      <section className="mt-12">
        <div className="mb-6">
          <h2 className="font-mono text-lg text-brand">{t("projectsTitle")}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              data={project.frontmatter}
              locale={locale}
              hrefPrefix="/personal-projects"
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
