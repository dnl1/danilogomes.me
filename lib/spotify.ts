export type SpotifyRelease = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  previewUrl?: string;
};

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

type SpotifyTopTrackEntry = {
  track?: {
    albumOfTrack?: {
      uri?: string;
    };
    previews?: {
      audioPreviews?: {
        items?: Array<{
          url?: string;
        }>;
      };
    };
  };
};

const ARTIST_IDS = {
  dnl1: "7IbyntkWwrrsRd9RSTRo8J",
  undercolin: "6nwROjcnQdTIbv2zIu6Frn"
} as const;

export type SpotifyArtistKey = keyof typeof ARTIST_IDS;

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
              latest?: SpotifyReleaseEntry | null;
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
              topTracks?: {
                items?: SpotifyTopTrackEntry[];
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

function extractReleasesFromState(html: string, artistId: string, limit: number) {
  const initialState = decodeInitialState(html);
  const artist = initialState?.entities?.items?.[`spotify:artist:${artistId}`];

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
  const previews = new Map<string, string>();

  for (const item of artist.discography.topTracks?.items ?? []) {
    const albumId = item.track?.albumOfTrack?.uri?.split(":").pop();
    const previewUrl = item.track?.previews?.audioPreviews?.items?.find((preview) => preview.url)?.url;

    if (albumId && previewUrl && !previews.has(albumId)) {
      previews.set(albumId, previewUrl);
    }
  }

  for (const candidate of candidates) {
    const release = mapRelease(candidate);

    if (!release || seen.has(release.id)) {
      continue;
    }

    seen.add(release.id);
    release.previewUrl = previews.get(release.id);
    releases.push(release);

    if (releases.length >= limit) {
      break;
    }
  }

  return releases;
}

function extractReleasesFromHtml(html: string, limit: number) {
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

export async function getLatestSpotifyReleasesByArtist(
  artist: SpotifyArtistKey,
  limit = 4
): Promise<SpotifyRelease[]> {
  const artistId = ARTIST_IDS[artist];
  const response = await fetch(`https://open.spotify.com/artist/${artistId}`, {
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
  const stateReleases = extractReleasesFromState(html, artistId, limit);

  if (stateReleases.length) {
    return stateReleases;
  }

  return extractReleasesFromHtml(html, limit);
}

export async function getLatestSpotifyReleases(limit = 4): Promise<SpotifyRelease[]> {
  return getLatestSpotifyReleasesByArtist("dnl1", limit);
}
