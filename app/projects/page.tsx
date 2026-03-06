import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/metadata";
import { getPortfolioProjects } from "@/lib/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ProjectsPage");

  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/projects"
  });
}

export default async function ProjectsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("ProjectsPage");
  const layoutT = await getTranslations("Layout");
  const projects = getPortfolioProjects(locale);

  return (
    <Container className="py-16 md:py-24">
      <BackButton label={layoutT("back")} />
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
        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              variant="detailed"
              project={project}
              labels={{
                problem: t("problem"),
                approach: t("approach"),
                impact: t("impact")
              }}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
