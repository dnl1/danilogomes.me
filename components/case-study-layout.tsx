import type { ReactNode } from "react";

type CaseStudyLayoutProps = {
  company: string;
  title: string;
  description: string;
  technologies: string[];
  children: ReactNode;
};

export function CaseStudyLayout({
  company,
  title,
  description,
  technologies,
  children
}: CaseStudyLayoutProps) {
  return (
    <article className="mx-auto max-w-4xl">
      <p className="font-mono text-sm text-brand">{company}</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">{description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span key={tech} className="rounded-md border border-line/80 px-3 py-2 font-mono text-xs">
            {tech}
          </span>
        ))}
      </div>

      <div className="prose mt-10 max-w-none">{children}</div>
    </article>
  );
}
