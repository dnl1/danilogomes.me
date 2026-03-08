import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Container } from "@/components/container";
import { NavbarClient } from "@/components/navbar-client";

const navItems = [
  { href: "/about", key: "about" },
  { href: "/experience", key: "experience" },
  { href: "/projects", key: "projects" },
  { href: "/personal-projects", key: "personalProjects" },
  { href: "/music", key: "music" },
  { href: "/contact", key: "contact" }
] as const;

export async function Navbar() {
  const t = await getTranslations("Navbar");
  const items = navItems.map((item) => ({ href: item.href, label: t(item.key) }));

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-mono text-sm text-muted transition hover:text-fg">
          <span className="text-brand">~/</span>danilo gomes
        </Link>

        <NavbarClient
          navItems={items}
          labels={{
            openMenu: t("openMenu"),
            closeMenu: t("closeMenu"),
            mobileNavigation: t("mobileNavigation")
          }}
        />
      </Container>
    </header>
  );
}
