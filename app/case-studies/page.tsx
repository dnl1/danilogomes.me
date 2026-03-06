import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { BackButton } from "@/components/back-button";
import { CaseStudyCard } from "@/components/case-study-card";
import { Container } from "@/components/container";
import type { Locale } from "@/i18n/routing";
import { getCollection } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("CaseStudiesPage");

  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/case-studies"
  });
}

export default async function CaseStudiesPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("CaseStudiesPage");
  const layoutT = await getTranslations("Layout");
  const caseStudies = await getCollection(locale, "case-studies");

  return (
    <Container className="py-16 md:py-24">
      <BackButton label={layoutT("back")} />
      <header className="mb-10 max-w-4xl">
        <p className="font-mono text-sm text-brand">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{t("heading")}</h1>
        <p className="mt-4 text-lg text-muted">{t("intro")}</p>
      </header>

      <section className="rounded-2xl border border-line/80 bg-black/20 p-6">
        <p className="font-mono text-xs text-brand">{t("summaryTitle")}</p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted">{t("summaryDescription")}</p>
      </section>

      <section className="mt-10">
        <div className="grid gap-5">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} slug={caseStudy.slug} data={caseStudy.frontmatter} />
          ))}
        </div>
      </section>
    </Container>
  );
}
