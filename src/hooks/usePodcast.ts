import { useState, useEffect } from "react";
import { PodcastService } from "../services/PodcastService";

export const usePodcastData = (podcastId: string) => {
  const [rssData, setRssData] = useState<any | null>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const podcastService = PodcastService.getInstance();

        const podcastData = await podcastService.fetchPodcastById(podcastId);
        setRssData(podcastData);

        const episodesData = await podcastService.fetchEpisodesByPodcastId(podcastId);
        setEpisodes(episodesData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (podcastId) {
      fetchData();
    }
  }, [podcastId]);

  return { rssData, episodes, isLoading, error };
};
