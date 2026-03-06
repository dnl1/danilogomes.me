import Image from "next/image";
import { FlagIcon, getFlagCode } from "@/components/flag-icon";
import type { ExperienceFrontmatter } from "@/lib/content";
import { formatMonthYear } from "@/lib/utils";

type ExperienceCardProps = {
  entry: ExperienceFrontmatter;
  locale: string;
  labels: {
    location: string;
    progression: string;
    responsibilities: string;
    technologies: string;
    present: string;
  };
};

export function ExperienceCard({ entry, locale, labels }: ExperienceCardProps) {
  const locationFlag = getFlagCode(entry.location);
  const logoContainerClass =
    entry.logoBackground === "light"
      ? "border-white/15 bg-white"
      : "border-line/80 bg-black/30";

  return (
    <article className="relative rounded-2xl border border-line/80 bg-black/20 p-6">
      <span className="absolute -left-[2.05rem] top-10 hidden h-3 w-3 rounded-full border border-line/80 bg-brand md:block" />
      <div className="flex items-start gap-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border ${logoContainerClass}`}
        >
          <Image src={entry.logo} alt={`${entry.company} logo`} width={64} height={64} className="h-12 w-12 object-contain" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-xs text-brand">
            <span className="inline-flex items-center gap-2">
              {locationFlag ? <FlagIcon code={locationFlag} className="h-4 w-4" /> : null}
              <span>
                {entry.location}
              </span>
            </span>
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">{entry.company}</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{entry.summary}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_1fr_0.9fr]">
        <section>
          <h3 className="font-mono text-xs text-muted">{labels.progression}</h3>
          <div className="mt-3 space-y-3">
            {entry.roles.map((role) => (
              <div key={`${role.title}-${role.start}`} className="rounded-lg border border-line/70 bg-black/20 px-4 py-3">
                <p className="text-sm font-medium text-fg">{role.title}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {formatMonthYear(role.start, locale)} -{" "}
                  {role.end === "Present" ? labels.present : formatMonthYear(role.end, locale)}
                </p>
              </div>
            ))}
          </div>
        </section>

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
      </div>
    </article>
  );
}
