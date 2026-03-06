import Image from "next/image";
import type { ExperienceEntry } from "@/lib/portfolio";

type ExperienceCardProps = {
  entry: ExperienceEntry;
  labels: {
    responsibilities: string;
    technologies: string;
    impact: string;
  };
};

export function ExperienceCard({ entry, labels }: ExperienceCardProps) {
  return (
    <article className="rounded-2xl border border-line/80 bg-black/20 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line/80 bg-black/30">
          <Image src={entry.logo} alt={`${entry.company} logo`} width={56} height={56} className="h-10 w-10 object-contain" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-xs text-brand">{entry.role}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">{entry.company}</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{entry.summary}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section>
          <h3 className="font-mono text-xs text-muted">{labels.responsibilities}</h3>
          <ul className="mt-3 space-y-3 text-sm text-muted">
            {entry.responsibilities.map((item) => (
              <li key={item} className="rounded-lg border border-line/70 bg-black/20 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-mono text-xs text-muted">{labels.technologies}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.technologies.map((tech) => (
              <span key={tech} className="rounded-md border border-line/80 px-3 py-2 font-mono text-xs">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-mono text-xs text-muted">{labels.impact}</h3>
          <ul className="mt-3 space-y-3 text-sm text-muted">
            {entry.impact.map((item) => (
              <li key={item} className="rounded-lg border border-line/70 bg-black/20 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
