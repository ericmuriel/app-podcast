export type Podcast = {
  id: {
    attributes: {
      "im:id": string;
    };
  };
  "im:name": {
    label: string;
  };
  "im:artist": {
    label: string;
  };
  "im:image": {
    label: string;
  }[];
};

export type PodcastListResponse = {
  feed: {
    entry: Podcast[];
  };
};

export class PodcastService {
  private static instance: PodcastService;
  private podcastsCache: Podcast[] | null = null;
  private lastFetchTime: number | null = null;

  private readonly podcastLimit = 100;
  private readonly oneDayInMs = 86400000;

  private constructor() {}

  public static getInstance(): PodcastService {
    if (!PodcastService.instance) {
      PodcastService.instance = new PodcastService();
    }
    return PodcastService.instance;
  }

  async fetchAllPodcasts(): Promise<Podcast[]> {
    const now = Date.now();

    if (
      this.podcastsCache &&
      this.lastFetchTime &&
      now - this.lastFetchTime < this.oneDayInMs
    ) {
      console.log("Using cached podcasts data");
      return this.podcastsCache;
    }

    console.log("Fetching podcasts from API...");
    const response = await fetch(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=${this.podcastLimit}/genre=1310/json`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch podcasts: ${response.statusText}`);
    }

    const data: PodcastListResponse = await response.json();
    this.podcastsCache = data.feed.entry;
    this.lastFetchTime = now;

    return this.podcastsCache;
  }

  async fetchPodcastById(id: string): Promise<any> {
    console.log(`Fetching podcast details for ID: ${id}`);
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${id}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch podcast by ID: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results[0];
  }

  async fetchPodcastRSS(rssUrl: string): Promise<any> {
    console.log(`Fetching podcast RSS from: ${rssUrl}`);
    const response = await fetch(rssUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch podcast RSS: ${response.statusText}`);
    }

    const text = await response.text();

    // Parse XML (You can use an XML parser or process it as needed)
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    // Convert the XML data into a JavaScript object (basic implementation)
    const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
      title: item.querySelector("title")?.textContent || "",
      pubDate: item.querySelector("pubDate")?.textContent || "",
      duration: item.querySelector("itunes\\:duration")?.textContent || "N/A",
      guid: item.querySelector("guid")?.textContent || "",
    }));

    return { items };
  }
}
