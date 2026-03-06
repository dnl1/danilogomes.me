import { getCollection } from "@/lib/content";
import { detectLocale } from "@/lib/locale";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const locale = await detectLocale();
  const posts = await getCollection(locale, "blog");
  const channelTitle =
    locale === "pt" ? "Danilo Gomes | Engenheiro de Software" : "Danilo Gomes | Software Engineer";
  const channelDescription =
    locale === "pt"
      ? "Engenheiro de software com mais de 10 anos de experiência projetando sistemas financeiros, de saúde e plataformas empresariais complexas."
      : "Software engineer with more than 10 years of experience designing complex financial, healthcare, and enterprise platforms.";

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      return `
        <item>
          <title>${escapeXml(post.frontmatter.title)}</title>
          <description>${escapeXml(post.frontmatter.description)}</description>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
        </item>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(channelTitle)}</title>
        <description>${escapeXml(channelDescription)}</description>
        <link>${siteConfig.url}</link>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
