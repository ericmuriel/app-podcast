import { useState, useEffect } from "react";
import { PodcastService } from "../services/PodcastService";

export const usePodcastEpisodes = (feedUrl: string) => {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!feedUrl) {
        setEpisodes([]);
        setIsLoading(false);
        return;
      }

      try {
        console.log('entro1')
        setIsLoading(true);
        const podcastService = PodcastService.getInstance();
        const data = await podcastService.fetchPodcastRSS(feedUrl); 
        console.log("Fetched episodes:", data.items);
        setEpisodes(data.items || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        console.log('entro2')
        setIsLoading(false);
      }
    };

    if (feedUrl) {
      fetchEpisodes();
    }

  }, [feedUrl]);

  return { episodes, isLoading, error };
};
