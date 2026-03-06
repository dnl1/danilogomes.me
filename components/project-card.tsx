import Link from "next/link";
import type { ProjectFrontmatter } from "@/lib/content";
import type { PortfolioProject } from "@/lib/portfolio";
import { formatDate } from "@/lib/utils";

type CompactProjectCardProps = {
  variant?: "compact";
  slug: string;
  data: ProjectFrontmatter;
  locale: string;
};

type DetailedProjectCardProps = {
  variant: "detailed";
  project: PortfolioProject;
  labels: {
    problem: string;
    approach: string;
    impact: string;
  };
};

type ProjectCardProps = CompactProjectCardProps | DetailedProjectCardProps;

export function ProjectCard(props: ProjectCardProps) {
  if (props.variant === "detailed") {
    const { project, labels } = props;

    return (
      <article className="rounded-2xl border border-line/80 bg-black/20 p-6">
        <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-md border border-line/80 px-3 py-2 font-mono text-xs">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <section className="rounded-xl border border-line/70 bg-black/20 p-4">
            <p className="font-mono text-xs text-muted">{labels.problem}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{project.problem}</p>
          </section>
          <section className="rounded-xl border border-line/70 bg-black/20 p-4">
            <p className="font-mono text-xs text-muted">{labels.approach}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{project.approach}</p>
          </section>
          <section className="rounded-xl border border-line/70 bg-black/20 p-4">
            <p className="font-mono text-xs text-muted">{labels.impact}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{project.impact}</p>
          </section>
        </div>
      </article>
    );
  }

  const { slug, data, locale } = props;

  return (
    <Link
      href={`/projects/${slug}`}
      className="group rounded-xl border border-line/80 bg-black/20 p-5 transition hover:border-brand/80 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <p className="mb-2 font-mono text-xs text-muted">{formatDate(data.date, locale)}</p>
      <h3 className="text-xl font-semibold tracking-tight group-hover:text-brand">{data.title}</h3>
      <p className="mt-3 text-sm text-muted">{data.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {data.techStack.map((tech) => (
          <span key={tech} className="rounded-md border border-line/80 px-2 py-1 font-mono text-xs">
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
