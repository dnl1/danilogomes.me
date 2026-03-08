"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FlagIcon } from "@/components/flag-icon";
import type { Locale } from "@/i18n/routing";

const languageOptions: Array<{ value: Locale; label: string; flag: "us" | "br" }> = [
  { value: "pt", label: "Português", flag: "br" },
  { value: "en", label: "English", flag: "us" }
];

export function LanguageSelector() {
  const locale = useLocale() as Locale;
  const t = useTranslations("LanguageSelector");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(nextLocale: Locale) {
    try {
      localStorage.setItem("preferred-locale", nextLocale);
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {}

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      className="inline-flex w-full items-center gap-1 rounded-xl border border-line/80 bg-black/20 p-1 sm:w-auto"
      aria-label={t("label")}
    >
      {languageOptions.map((option) => {
        const active = option.value === locale;

        return (
          <button
            key={option.value}
            type="button"
            disabled={isPending || active}
            onClick={() => handleChange(option.value)}
            className={`inline-flex min-h-9 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:flex-none sm:text-sm ${
              active
                ? "border border-brand/40 bg-brand/10 text-fg"
                : "border border-transparent text-muted hover:border-line/80 hover:bg-black/20 hover:text-fg"
            }`}
            aria-pressed={active}
            aria-label={`${t("label")}: ${option.label}`}
          >
            <FlagIcon code={option.flag} className="h-4 w-4" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
