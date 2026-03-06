export type SpotifyRelease = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
};

const DNL1_ARTIST_ID = "7IbyntkWwrrsRd9RSTRo8J";

type SpotifyImageSource = {
  height?: number;
  url?: string;
  width?: number;
};

type SpotifyReleaseEntry = {
  coverArt?: {
    sources?: SpotifyImageSource[];
  };
  date?: {
    year?: number;
  };
  name?: string;
  type?: string;
  uri?: string;
};

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function decodeInitialState(html: string) {
  const match = html.match(/<script id="initialState" type="text\/plain">([^<]+)<\/script>/);

  if (!match?.[1]) {
    return null;
  }

  try {
    const decoded = Buffer.from(match[1], "base64").toString("utf8");
    return JSON.parse(decoded) as {
      entities?: {
        items?: Record<
          string,
          {
            discography?: {
              latest?: SpotifyReleaseEntry;
              popularReleasesAlbums?: {
                items?: SpotifyReleaseEntry[];
              };
              singles?: {
                items?: Array<{
                  releases?: {
                    items?: SpotifyReleaseEntry[];
                  };
                }>;
              };
            };
          }
        >;
      };
    };
  } catch {
    return null;
  }
}

function mapRelease(entry: SpotifyReleaseEntry): SpotifyRelease | null {
  const uri = entry.uri?.split(":").pop();
  const image = entry.coverArt?.sources?.find((source) => source.url)?.url;
  const title = entry.name?.trim();

  if (!uri || !image || !title) {
    return null;
  }

  const releaseType = entry.type?.toLowerCase() ?? "release";
  const year = entry.date?.year;

  return {
    id: uri,
    title,
    subtitle: year ? `${year} • ${releaseType}` : releaseType,
    image,
    href: `https://open.spotify.com/album/${uri}`
  };
}

function extractReleasesFromState(html: string, limit: number) {
  const initialState = decodeInitialState(html);
  const artist = initialState?.entities?.items?.[`spotify:artist:${DNL1_ARTIST_ID}`];

  if (!artist?.discography) {
    return [];
  }

  const candidates: SpotifyReleaseEntry[] = [];

  if (artist.discography.latest) {
    candidates.push(artist.discography.latest);
  }

  for (const release of artist.discography.popularReleasesAlbums?.items ?? []) {
    candidates.push(release);
  }

  for (const group of artist.discography.singles?.items ?? []) {
    for (const release of group.releases?.items ?? []) {
      candidates.push(release);
    }
  }

  const releases: SpotifyRelease[] = [];
  const seen = new Set<string>();

  for (const candidate of candidates) {
    const release = mapRelease(candidate);

    if (!release || seen.has(release.id)) {
      continue;
    }

    seen.add(release.id);
    releases.push(release);

    if (releases.length >= limit) {
      break;
    }
  }

  return releases;
}

export async function getLatestSpotifyReleases(limit = 4): Promise<SpotifyRelease[]> {
  const response = await fetch(`https://open.spotify.com/artist/${DNL1_ARTIST_ID}`, {
    headers: {
      "user-agent": "Mozilla/5.0"
    },
    next: {
      revalidate: 60 * 60 * 12
    }
  });

  if (!response.ok) {
    throw new Error(`Spotify request failed with status ${response.status}`);
  }

  const html = await response.text();
  const stateReleases = extractReleasesFromState(html, limit);

  if (stateReleases.length) {
    return stateReleases;
  }

  const matches = html.matchAll(
    /<a[^>]+href="\/album\/([^"]+)"[^>]*><img[^>]+src="([^"]+)"[^>]*><div[^>]*><span[^>]*>([^<]+)<\/span><span[^>]*>([^<]+)<\/span><\/div><\/a>/g
  );

  const releases: SpotifyRelease[] = [];
  const seen = new Set<string>();

  for (const match of matches) {
    const [, id, image, rawTitle, rawSubtitle] = match;

    if (!id || seen.has(id)) {
      continue;
    }

    seen.add(id);
    releases.push({
      id,
      title: decodeHtml(rawTitle.trim()),
      subtitle: decodeHtml(rawSubtitle.trim()),
      image,
      href: `https://open.spotify.com/album/${id}`
    });

    if (releases.length >= limit) {
      break;
    }
  }

  return releases;
}
