import { fetchWithRetry } from "../utils/fetchWithRetry";

export type Podcast = {
  id: { attributes: { "im:id": string } };
  "im:name": { label: string };
  "im:artist": { label: string };
  "im:image": { label: string }[];
};

export type PodcastListResponse = {
  feed: { entry: Podcast[] };
};

export class PodcastService {
  private static instance: PodcastService;
  private readonly podcastLimit = 100;

  private constructor() {}

  public static getInstance(): PodcastService {
    if (!PodcastService.instance) {
      PodcastService.instance = new PodcastService();
    }
    return PodcastService.instance;
  }

  public async fetchAllPodcasts(): Promise<Podcast[]> {
    console.log("Fetching podcasts from API...");
    const response = await fetch(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=${this.podcastLimit}/genre=1310/json`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch podcasts: ${response.statusText}`);
    }

    const data: PodcastListResponse = await response.json();
    return data.feed.entry;
  }

  public async fetchPodcastById(id: string): Promise<any> {
    console.log(`Fetching podcast details for ID: ${id}`);
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const targetUrl = encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}`);
  
    const response = await fetchWithRetry(`${proxyUrl}${targetUrl}`, {}, 3, 1000);
  
    const { contents } = await response.json();
    const data = JSON.parse(contents);
  
    if (!data || !data.results || data.results.length === 0) {
      throw new Error("No data found for the given podcast ID.");
    }
    return data.results[0];
  }

  async fetchEpisodesByPodcastId(id: string): Promise<any[]> {
    const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch episodes for podcast ID: ${id}`);
    }
  
    const data = await response.json();
    return data.results.filter((item: any) => item.wrapperType === "podcastEpisode");
  }
}
