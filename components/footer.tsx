import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-line/80 py-8">
      <Container className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <p className="text-sm text-muted">
          {t("builtWith", { year: new Date().getFullYear(), name: siteConfig.name })}
        </p>
      </Container>
      <Container className="mt-6">
        <SocialLinks />
      </Container>
    </footer>
  );
}
