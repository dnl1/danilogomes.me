import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
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
