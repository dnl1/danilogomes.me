import { ExperienceCard } from "@/components/experience-card";
import type { ExperienceFrontmatter } from "@/lib/content";

type ExperienceTimelineEntry = {
  slug: string;
  frontmatter: ExperienceFrontmatter;
};

type ExperienceTimelineProps = {
  entries: ExperienceTimelineEntry[];
  locale: string;
  labels: {
    location: string;
    areas: string;
    progression: string;
    responsibilities: string;
    technologies: string;
    present: string;
  };
};

export function ExperienceTimeline({ entries, locale, labels }: ExperienceTimelineProps) {
  return (
    <div className="space-y-6 md:border-l md:border-line/80 md:pl-8">
      {entries.map((entry) => (
        <ExperienceCard
          key={entry.slug}
          entry={entry.frontmatter}
          entryId={entry.slug}
          locale={locale}
          labels={labels}
        />
      ))}
    </div>
  );
}
