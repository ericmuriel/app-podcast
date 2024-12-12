import React from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import "./PodcastView.scss";
import CardContainer from "../CardContainer/CardContainer";
import { usePodcastData } from "../../hooks/usePodcast";
import { usePodcastEpisodes } from "../../hooks/usePodcastEpisodes";
import PodcastInfoCard from "../LateralPodcastInfoCard/LateralPodcastInfoCard";

const PodcastView: React.FC = () => {
  const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>();

  const { rssData, isLoading: isPodcastLoading, error: podcastError } = usePodcastData(podcastId!);

  const feedUrl = rssData?.feedUrl || "";
  const { episodes, isLoading: isEpisodesLoading, error: episodesError } = usePodcastEpisodes(feedUrl);

  if (isPodcastLoading || isEpisodesLoading) {
    return <div className="podcast-view__loading">Cargando episodio...</div>;
  }

  if (podcastError || episodesError) {
    return (
      <div className="podcast-view__error">
        Error al cargar el episodio. Por favor, inténtalo de nuevo.
        <br />
        {podcastError || episodesError}
      </div>
    );
  }

  if (!episodes || episodes.length === 0) {
    return <div className="podcast-view__error">No se encontraron episodios para este podcast.</div>;
  }

  const index = parseInt(episodeId || "", 10);
  const item = episodes[index];

  if (!item) {
    return <div className="podcast-view__error">El episodio no existe.</div>;
  }

  return (
    <div className="podcast-view">
      <div className="podcast-view__sidebar">
      <PodcastInfoCard
        artworkUrl={rssData.artworkUrl600}
        collectionName={rssData.collectionName}
        artistName={rssData.artistName}
        description={rssData.primaryGenreName}
      />
      </div>
      <div className="podcast-view">
      <CardContainer>
        <h1 className="podcast-view__title">
          {parse(item.title || "Sin título")}
        </h1>

        <div className="podcast-view__description">
          {parse(item.description || "No description available.")}
        </div>

        <audio controls className="podcast-view__audio">
          <source src={item.enclosure?.["@_url"]} type={item.enclosure?.["@_type"]} />
          Your browser does not support the audio element.
        </audio>
      </CardContainer>
    </div>
    </div>
    
  );
};

export default PodcastView;
