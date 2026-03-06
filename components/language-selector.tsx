"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Locale } from "@/i18n/routing";

const languageOptions: Array<{ value: Locale; label: string }> = [
  { value: "en", label: "🇺🇸 English" },
  { value: "pt", label: "🇧🇷 Portugues (BR)" }
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
    <label className="relative">
      <span className="sr-only">{t("label")}</span>
      <select
        aria-label={t("label")}
        value={locale}
        disabled={isPending}
        onChange={(event) => handleChange(event.target.value as Locale)}
        className="rounded-md border border-line/80 bg-black/30 px-2 py-1 text-xs text-fg outline-none transition focus:border-brand"
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
