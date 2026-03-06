import fs from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx";
import type { Locale } from "@/i18n/routing";

export type CollectionName = "projects" | "music" | "blog" | "case-studies";

export type BaseFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  featured?: boolean;
};

export type ProjectFrontmatter = BaseFrontmatter & {
  company: string;
  techStack: string[];
  screenshots?: string[];
};

export type MusicFrontmatter = BaseFrontmatter & {
  platform: string;
  spotifyUrl?: string;
  soundcloudUrl?: string;
  youtubeUrl?: string;
};

export type BlogFrontmatter = BaseFrontmatter;

export type CaseStudyFrontmatter = BaseFrontmatter & {
  company: string;
  technologies: string[];
};

export type CollectionFrontmatter = {
  projects: ProjectFrontmatter;
  music: MusicFrontmatter;
  blog: BlogFrontmatter;
  "case-studies": CaseStudyFrontmatter;
};

export type CollectionItem<T extends BaseFrontmatter> = {
  slug: string;
  frontmatter: T;
};

export type CollectionMdxItem<T extends BaseFrontmatter> = {
  slug: string;
  frontmatter: T;
  content: ReactNode;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function getCollectionPath(locale: Locale, collection: CollectionName) {
  return path.join(CONTENT_ROOT, locale, collection);
}

export async function getSlugs(locale: Locale, collection: CollectionName) {
  const dir = getCollectionPath(locale, collection);
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

export async function getCollection<T extends CollectionName>(
  locale: Locale,
  collection: T
): Promise<CollectionItem<CollectionFrontmatter[T]>[]> {
  const slugs = await getSlugs(locale, collection);

  const items = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(getCollectionPath(locale, collection), `${slug}.mdx`);
      const source = await fs.readFile(filePath, "utf8");
      const { data } = matter(source);

      return {
        slug,
        frontmatter: data as CollectionFrontmatter[T]
      };
    })
  );

  return items.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export async function getContentBySlug<T extends CollectionName>(
  locale: Locale,
  collection: T,
  slug: string
): Promise<CollectionMdxItem<CollectionFrontmatter[T]> | null> {
  try {
    const filePath = path.join(getCollectionPath(locale, collection), `${slug}.mdx`);
    const source = await fs.readFile(filePath, "utf8");

    const { content, frontmatter } = await compileMDX<CollectionFrontmatter[T]>({
      source,
      components: mdxComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "append" }],
            [rehypePrettyCode, { theme: "github-dark" }]
          ]
        }
      }
    });

    return {
      slug,
      frontmatter,
      content
    };
  } catch {
    return null;
  }
}
