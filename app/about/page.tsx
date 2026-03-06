import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { FlagIcon, getFlagCode } from "@/components/flag-icon";
import { ProfileAssetsCard } from "@/components/profile-assets-card";
import { SocialLinks } from "@/components/social-links";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AboutPage");

  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/about"
  });
}

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");
  const language1Flag = getFlagCode(t("language1Name"));
  const language2Flag = getFlagCode(t("language2Name"));

  return (
    <Container className="py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-sm text-brand">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{t("heading")}</h1>
        <div className="prose mt-8 max-w-none">
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
          <h2>{t("valuesHeading")}</h2>
          <ul>
            <li>{t("value1")}</li>
            <li>{t("value2")}</li>
            <li>{t("value3")}</li>
          </ul>
        </div>
        <section className="mt-10 rounded-2xl border border-line/80 bg-black/20 p-6">
          <p className="font-mono text-xs text-brand">{t("languagesHeading")}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-line/70 bg-black/20 px-4 py-3">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-fg">
                {language1Flag ? <FlagIcon code={language1Flag} className="h-4 w-4" /> : null}
                <span>{t("language1Name")}</span>
              </p>
              <p className="mt-1 font-mono text-xs text-muted">{t("language1Level")}</p>
            </div>
            <div className="rounded-lg border border-line/70 bg-black/20 px-4 py-3">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-fg">
                {language2Flag ? <FlagIcon code={language2Flag} className="h-4 w-4" /> : null}
                <span>{t("language2Name")}</span>
              </p>
              <p className="mt-1 font-mono text-xs text-muted">{t("language2Level")}</p>
            </div>
          </div>
        </section>
        <ProfileAssetsCard
          title={t("profileTitle")}
          description={t("profileDescription")}
          viewLabel={t("viewCv")}
          downloadLabel={t("downloadCv")}
          photoAlt={t("photoAlt")}
          className="mt-10"
        />
        <SocialLinks className="mt-10" />
      </div>
    </Container>
  );
}
