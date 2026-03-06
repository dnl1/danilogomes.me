import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/back-button";
import { CaseStudyLayout } from "@/components/case-study-layout";
import { Container } from "@/components/container";
import type { Locale } from "@/i18n/routing";
import { getContentBySlug, getSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getSlugs("en", "case-studies");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const { slug } = await params;
  const caseStudy = await getContentBySlug(locale, "case-studies", slug);
  if (!caseStudy) return {};

  return {
    title: caseStudy.frontmatter.title,
    description: caseStudy.frontmatter.description,
    alternates: {
      canonical: absoluteUrl(`/case-studies/${slug}`)
    },
    openGraph: {
      url: absoluteUrl(`/case-studies/${slug}`),
      images: [{ url: caseStudy.frontmatter.image }]
    }
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const locale = (await getLocale()) as Locale;
  const layoutT = await getTranslations("Layout");
  const { slug } = await params;
  const caseStudy = await getContentBySlug(locale, "case-studies", slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <Container className="py-16 md:py-24">
      <BackButton label={layoutT("back")} fallbackHref="/case-studies" />
      <CaseStudyLayout
        company={caseStudy.frontmatter.company}
        title={caseStudy.frontmatter.title}
        description={caseStudy.frontmatter.description}
        technologies={caseStudy.frontmatter.technologies}
      >
        {caseStudy.content}
      </CaseStudyLayout>
    </Container>
  );
}
