import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ProfileAssetsCard } from "@/components/profile-assets-card";
import { SocialLinks } from "@/components/social-links";
import type { Locale } from "@/i18n/routing";
import { getCollection } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ExperiencePage");

  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/experience"
  });
}

export default async function ExperiencePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("ExperiencePage");
  const entries = await getCollection(locale, "experience");

  return (
    <Container className="py-16 md:py-24">
      <header className="mb-10 max-w-4xl">
        <p className="font-mono text-sm text-brand">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{t("heading")}</h1>
        <p className="mt-4 text-lg text-muted">{t("intro")}</p>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-line/80 bg-black/20 p-6">
          <p className="font-mono text-xs text-brand">{t("summaryTitle")}</p>
          <p className="mt-3 text-sm leading-7 text-muted">{t("summaryDescription")}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[t("tag1"), t("tag2"), t("tag3"), t("tag4"), t("tag5"), t("tag6")].map((item) => (
              <span key={item} className="rounded-md border border-line/80 px-3 py-2 font-mono text-xs">
                {item}
              </span>
            ))}
          </div>
        </div>

        <ProfileAssetsCard
          title={t("profileTitle")}
          description={t("profileDescription")}
          viewLabel={t("viewCv")}
          downloadLabel={t("downloadCv")}
          photoAlt={t("photoAlt")}
        />
      </section>

      <section className="mt-12">
        <div className="mb-6">
          <h2 className="font-mono text-lg text-brand">{t("timelineTitle")}</h2>
        </div>
        <ExperienceTimeline
          entries={entries.map((entry) => entry.frontmatter)}
          locale={locale}
          labels={{
            location: t("location"),
            progression: t("progression"),
            responsibilities: t("responsibilities"),
            technologies: t("technologies"),
            present: t("present")
          }}
        />
      </section>

      <SocialLinks groups={["professional"]} className="mt-12" />
    </Container>
  );
}
