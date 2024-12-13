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

  private readonly podcastLimit = 100;
  private readonly oneDayInMs = 86400000;

  private constructor() {}

  public static getInstance(): PodcastService {
    if (!PodcastService.instance) {
      PodcastService.instance = new PodcastService();
    }
    return PodcastService.instance;
  }

  private setLocalStorageWithExpiry(key: string, value: any, ttl: number) {
    const now = Date.now();
    const item = {
      value,
      expiry: now + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  private getLocalStorageWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    try {
      const item = JSON.parse(itemStr);
      const now = Date.now();
      if (now > item.expiry || !item.value || Object.keys(item.value).length === 0) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return null;
    }
  }

  async fetchAllPodcasts(): Promise<Podcast[]> {
    const cacheKey = "allPodcasts";
    const cachedData = this.getLocalStorageWithExpiry(cacheKey);

    if (cachedData) {
      console.log("Using cached podcasts data");
      return cachedData;
    }

    console.log("Fetching podcasts from API...");
    const response = await fetch(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=${this.podcastLimit}/genre=1310/json`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch podcasts: ${response.statusText}`);
    }

    const data: PodcastListResponse = await response.json();
    const podcasts = data.feed.entry;

    if (podcasts && podcasts.length > 0) {
      this.setLocalStorageWithExpiry(cacheKey, podcasts, this.oneDayInMs);
    }

    return podcasts;
  }

  async fetchPodcastById(id: string): Promise<any> {
    const cacheKey = `podcast-${id}`;
    const cachedData = this.getLocalStorageWithExpiry(cacheKey);

    if (cachedData) {
      console.log(`Using cached data for podcast ID: ${id}`);
      return cachedData;
    }

    console.log(`Fetching podcast details for ID: ${id}`);
    const encodedUrl = encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}`);
    const proxyUrl = `https://api.allorigins.win/get?url=${encodedUrl}`;

    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch podcast by ID: ${response.statusText}`);
    }

    const data = await response.json();
    const parsedData = JSON.parse(data.contents).results[0];

    if (parsedData) {
      this.setLocalStorageWithExpiry(cacheKey, parsedData, this.oneDayInMs);
    }

    return parsedData;
  }

  async fetchPodcastRSS(feedUrl: string): Promise<any> {
    const cacheKey = `rss-${feedUrl}`;
    const cachedData = this.getLocalStorageWithExpiry(cacheKey);

    if (cachedData) {
      console.log(`Using cached RSS data for URL: ${feedUrl}`);
      return cachedData;
    }

    console.log(`Fetching podcast RSS from: ${feedUrl}`);
    const encodedUrl = encodeURIComponent(feedUrl);
    const proxyUrl = `https://api.allorigins.win/get?url=${encodedUrl}`;

    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch podcast RSS: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.contents;

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
      title: item.querySelector("title")?.textContent || "Untitled",
      pubDate: item.querySelector("pubDate")?.textContent || "Unknown Date",
      duration: item.querySelector("itunes\\:duration")?.textContent || "Unknown Duration",
      guid: item.querySelector("guid")?.textContent || "",
      description: item.querySelector("description")?.textContent || "No description",
      audioUrl: item.querySelector("enclosure")?.getAttribute("url") || "",
      audioType: item.querySelector("enclosure")?.getAttribute("type") || "audio/mpeg",
    }));

    const rssData = { items };

    if (rssData && rssData.items.length > 0) {
      this.setLocalStorageWithExpiry(cacheKey, rssData, this.oneDayInMs);
    }

    return rssData;
  }
}


