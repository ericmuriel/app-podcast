import { useEffect, useState } from "react";
import { PodcastService, Podcast } from "../services/PodcastService";
import { CacheService } from "../services/CacheService";

export const usePodcastsEpisodes = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const podcastService = PodcastService.getInstance();
  const cacheService = CacheService.getInstance();

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = "allPodcasts";
      const oneDayInMs = 86400000;

      try {
        setIsLoading(true);

        const cachedData = cacheService.getItemWithExpiry(cacheKey);
        if (cachedData) {
          setPodcasts(cachedData);
          return;
        }

        const data = await podcastService.fetchAllPodcasts();
        setPodcasts(data);

        cacheService.setItemWithExpiry(cacheKey, data, oneDayInMs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { podcasts, isLoading, error };
};
