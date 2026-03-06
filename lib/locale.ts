import { cookies, headers } from "next/headers";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";

export async function detectLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  if (hasLocale(routing.locales, cookieLocale)) {
    return cookieLocale;
  }

  const headerStore = await headers();
  const country =
    headerStore.get("x-vercel-ip-country") ??
    headerStore.get("cf-ipcountry") ??
    headerStore.get("x-country-code");

  if (country?.toUpperCase() === "BR") {
    return "pt";
  }

  const acceptLanguage = headerStore.get("accept-language")?.toLowerCase() ?? "";
  if (/(^|,|\s)pt(-|_|\b)/.test(acceptLanguage)) {
    return "pt";
  }

  return routing.defaultLocale;
}
