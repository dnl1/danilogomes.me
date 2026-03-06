import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return buildMetadata({
    title: t("siteTitle"),
    description: t("siteDescription"),
    path: "/",
    image: "/opengraph-image"
  });
}

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <Container className="py-16 md:py-24">
      <section className="max-w-3xl">
          <p className="mb-3 font-mono text-sm text-brand">{t("eyebrow")}</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">{t("title")}</h1>
          <p className="mt-6 text-lg text-muted md:text-xl">{t("description")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/experience"
              className="rounded-lg border border-line bg-black/30 px-4 py-2 transition hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {t("viewProjects")}
            </Link>
            <Link
              href="/music"
              className="rounded-lg border border-line bg-black/30 px-4 py-2 transition hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {t("listenToMusic")}
            </Link>
          </div>
      </section>
    </Container>
  );
}
