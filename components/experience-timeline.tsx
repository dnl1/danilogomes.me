import { ExperienceCard } from "@/components/experience-card";
import type { ExperienceFrontmatter } from "@/lib/content";

type ExperienceTimelineProps = {
  entries: ExperienceFrontmatter[];
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
        <ExperienceCard key={entry.company} entry={entry} locale={locale} labels={labels} />
      ))}
    </div>
  );
}
