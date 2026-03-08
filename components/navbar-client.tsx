"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LanguageSelector } from "@/components/language-selector";

type NavItem = {
  href: Route;
  label: string;
};

type NavbarClientProps = {
  navItems: NavItem[];
  labels: {
    openMenu: string;
    closeMenu: string;
    mobileNavigation: string;
  };
};

export function NavbarClient({ navItems, labels }: NavbarClientProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    firstLinkRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen]);

  return (
    <>
      <nav aria-label="Primary" className="hidden items-center gap-6 text-sm md:flex">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="text-sm text-muted transition hover:text-fg">
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center gap-3 md:flex">
        <LanguageSelector />
      </div>

      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line/80 bg-black/30 text-muted transition hover:border-brand hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? labels.closeMenu : labels.openMenu}
      >
        {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>

      <div
        className={`fixed inset-0 top-16 z-50 md:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
          tabIndex={isOpen ? 0 : -1}
          aria-label={labels.closeMenu}
        />

        <section
          id="mobile-nav-panel"
          aria-label={labels.mobileNavigation}
          className={`absolute inset-x-5 top-4 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-line/80 bg-bg p-4 shadow-soft transition-all duration-200 ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <div className="mb-4">
            <LanguageSelector />
          </div>

          <nav aria-label={labels.mobileNavigation} className="flex flex-col">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                ref={index === 0 ? firstLinkRef : null}
                className="rounded-lg px-3 py-2.5 text-base text-muted transition hover:bg-black/20 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </>
  );
}
