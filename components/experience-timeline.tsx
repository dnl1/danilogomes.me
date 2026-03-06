import { ExperienceCard } from "@/components/experience-card";
import type { ExperienceEntry } from "@/lib/portfolio";

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
  labels: {
    responsibilities: string;
    technologies: string;
    impact: string;
  };
};

export function ExperienceTimeline({ entries, labels }: ExperienceTimelineProps) {
  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <ExperienceCard key={entry.slug} entry={entry} labels={labels} />
      ))}
    </div>
  );
}
