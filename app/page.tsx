import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { buildMetadata } from "@/lib/metadata";
import { profileAssets } from "@/lib/profile-assets";

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
      <section className="grid gap-10 md:grid-cols-[minmax(0,1fr)_240px] md:items-center">
        <div className="max-w-3xl">
          <p className="mb-3 font-mono text-sm text-brand">{t("eyebrow")}</p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">{t("title")}</h1>
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
        </div>

        <div className="flex justify-start md:justify-end">
          <div className="rounded-[2rem] border border-line/80 bg-[radial-gradient(circle_at_top,_rgba(255,153,102,0.22),_transparent_45%),linear-gradient(160deg,_rgba(75,86,210,0.28),_rgba(10,11,15,0.94))] p-3 shadow-soft">
            <div className="overflow-hidden rounded-full border border-white/10">
              <Image
                src={profileAssets.photo.href}
                alt={t("photoAlt")}
                width={320}
                height={320}
                className="h-40 w-40 object-cover md:h-52 md:w-52"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
