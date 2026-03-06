import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ContactPage");

  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contact"
  });
}

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");

  return (
    <Container className="py-16 md:py-24">
      <div className="max-w-2xl rounded-xl border border-line/80 bg-black/20 p-6 md:p-8">
        <p className="font-mono text-sm text-brand">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{t("heading")}</h1>
        <p className="mt-4 text-muted">{t("intro")}</p>

        <div className="mt-8 space-y-3 text-sm">
          <p>
            {t("email")}: <Link href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Link>
          </p>
          <p>
            {t("github")}: <Link href={siteConfig.links.github}>{siteConfig.links.github}</Link>
          </p>
          <p>
            {t("linkedin")}: <Link href={siteConfig.links.linkedin}>{siteConfig.links.linkedin}</Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
