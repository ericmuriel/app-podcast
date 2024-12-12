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
  
    const encodedUrl = encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}`);
    const proxyUrl = `https://api.allorigins.win/get?url=${encodedUrl}`;
  
    const response = await fetch(proxyUrl);
  
    if (!response.ok) {
      throw new Error(`Failed to fetch podcast by ID: ${response.statusText}`);
    }
  
    const data = await response.json();
    const text = data.contents;
  
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch (error) {
      throw new Error("Failed to parse the downloaded text as JSON");
    }
  
    return parsedData.results[0];
  }

  async fetchPodcastRSS(feedUrl: string): Promise<any> {
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
  
    return { items }; 
  }
  
}
