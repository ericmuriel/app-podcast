import { useState, useEffect } from "react";
import { PodcastService } from "../services/PodcastService";

export const usePodcastRSS = (rssUrl: string) => {
  const [rssData, setRssData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        setIsLoading(true);
        const podcastService = PodcastService.getInstance();
        const data = await podcastService.fetchPodcastRSS(rssUrl);
        setRssData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (rssUrl) {
      fetchRSS();
    }
  }, [rssUrl]);

  return { rssData, isLoading, error };
};
