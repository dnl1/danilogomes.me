import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function buildMetadata({
  title,
  description,
  path,
  image = "/opengraph-image"
}: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: image }]
    },
    twitter: {
      title,
      description,
      images: [image]
    }
  };
}
