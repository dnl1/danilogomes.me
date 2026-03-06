import { getRequestConfig } from "next-intl/server";
import { detectLocale } from "@/lib/locale";

export default getRequestConfig(async () => {
  const locale = await detectLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
