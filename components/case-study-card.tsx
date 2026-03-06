import Link from "next/link";
import type { CaseStudyFrontmatter } from "@/lib/content";

type CaseStudyCardProps = {
  slug: string;
  data: CaseStudyFrontmatter;
};

export function CaseStudyCard({ slug, data }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group rounded-2xl border border-line/80 bg-black/20 p-6 transition hover:border-brand/80 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <p className="font-mono text-xs text-brand">{data.company}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight group-hover:text-brand">{data.title}</h2>
      <p className="mt-3 text-sm leading-7 text-muted">{data.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {data.technologies.map((tech) => (
          <span key={tech} className="rounded-md border border-line/80 px-3 py-2 font-mono text-xs">
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
