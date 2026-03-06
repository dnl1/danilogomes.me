import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Container } from "@/components/container";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/about", key: "about" },
  { href: "/experience", key: "experience" },
  { href: "/projects", key: "projects" },
  { href: "/case-studies", key: "caseStudies" },
  { href: "/music", key: "music" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" }
] as const;

export async function Navbar() {
  const t = await getTranslations("Navbar");

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-mono text-sm text-muted transition hover:text-fg">
          <span className="text-brand">~/</span>danilo gomes
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-3 overflow-x-auto text-xs md:gap-6 md:text-sm"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition hover:text-fg"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
