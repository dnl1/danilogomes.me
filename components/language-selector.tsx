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
    <div className="flex items-center gap-1 rounded-xl border border-line/80 bg-black/30 p-1" aria-label={t("label")}>
      {languageOptions.map((option) => {
        const active = option.value === locale;

        return (
          <button
            key={option.value}
            type="button"
            disabled={isPending || active}
            onClick={() => handleChange(option.value)}
            className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              active ? "bg-white/10 text-fg" : "text-muted hover:text-fg"
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
