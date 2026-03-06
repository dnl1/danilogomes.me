import { getTranslations } from "next-intl/server";
import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Music2,
  type LucideIcon
} from "lucide-react";

type SocialGroup = "professional" | "music" | "band";

type SocialLinkItem = {
  href: string;
  labelKey: string;
  icon: LucideIcon;
};

type SocialLinksProps = {
  groups?: SocialGroup[];
  className?: string;
};

const socialGroups: Array<{
  id: SocialGroup;
  titleKey: string;
  links: SocialLinkItem[];
}> = [
  {
    id: "professional",
    titleKey: "professional",
    links: [
      {
        href: "https://www.linkedin.com/in/danilooliveiragomes/",
        labelKey: "linkedin",
        icon: Linkedin
      },
      {
        href: "https://github.com/dnl1",
        labelKey: "github",
        icon: Github
      }
    ]
  },
  {
    id: "music",
    titleKey: "music",
    links: [
      {
        href: "https://open.spotify.com/intl-pt/artist/7IbyntkWwrrsRd9RSTRo8J",
        labelKey: "spotifyPersonal",
        icon: Music2
      },
      {
        href: "https://soundcloud.com/danilo-oliveira-200150512",
        labelKey: "soundcloud",
        icon: Music2
      },
      {
        href: "https://instagram.com/dnl1",
        labelKey: "instagramPersonal",
        icon: Instagram
      }
    ]
  },
  {
    id: "band",
    titleKey: "band",
    links: [
      {
        href: "https://open.spotify.com/intl-pt/artist/6nwROjcnQdTIbv2zIu6Frn",
        labelKey: "spotifyBand",
        icon: Music2
      },
      {
        href: "https://www.instagram.com/undercolin/",
        labelKey: "instagramBand",
        icon: Instagram
      },
      {
        href: "https://undercolin.vercel.app/",
        labelKey: "websiteBand",
        icon: Globe
      }
    ]
  }
];

export async function SocialLinks({ groups = ["professional", "music", "band"], className = "" }: SocialLinksProps) {
  const t = await getTranslations("SocialLinks");
  const visibleGroups = socialGroups.filter((group) => groups.includes(group.id));

  return (
    <div className={className}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleGroups.map((group) => (
          <section key={group.id} aria-label={t(group.titleKey)} className="rounded-xl border border-line/80 bg-black/20 p-4">
            <h2 className="font-mono text-xs text-brand">{t(group.titleKey)}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {group.links.map((link) => {
                const Icon = link.icon;
                const label = t(link.labelKey);

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="inline-flex items-center gap-2 rounded-md border border-line/80 px-3 py-2 text-sm text-muted transition hover:scale-105 hover:border-brand hover:opacity-80 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
