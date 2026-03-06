import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Danilo Gomes | Software Engineer",
    short_name: siteConfig.name,
    description: "Software engineer with more than 10 years of experience designing complex financial, healthcare, and enterprise platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b0f",
    theme_color: "#0a0b0f",
    icons: [
      {
        src: "/images/og-default.svg",
        sizes: "1200x630",
        type: "image/svg+xml"
      }
    ]
  };
}
