import React from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import "./PodcastView.scss";
import PodcastInfoCard from "../LateralPodcastInfoCard/LateralPodcastInfoCard";
import CardContainer from "../CardContainer/CardContainer";
import { usePodcastData } from "../../hooks/usePodcast";
import { useLoader } from "../../context/LoaderContext";

const PodcastView: React.FC = () => {
  const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>();
  const { rssData, episodes, isLoading, error } = usePodcastData(podcastId!);
  const { setLoading } = useLoader();

  if (isLoading) {
    setLoading(true);
    return (
      <div className="podcast-view__loading" data-id="podcast-loading">
        Cargando episodio...
      </div>
    );
  }

  if (error || !episodes) {
    return (
      <div className="podcast-view__error" data-id="podcast-error">
        Error al cargar el episodio. Por favor, inténtalo de nuevo.
        <br />
        {error || "No se pudo cargar la información."}
      </div>
    );
  }

  const index = parseInt(episodeId || "", 10);
  const item = episodes[index];

  if (!item) {
    return (
      <div className="podcast-view__error" data-id="podcast-episode-not-found">
        El episodio no existe.
      </div>
    );
  }

  setLoading(false);

  return (
    <div className="podcast-view" data-id="podcast-view">
      <div className="podcast-view__sidebar" data-id="podcast-sidebar">
        <PodcastInfoCard
          artworkUrl={rssData?.artworkUrl600 || "https://via.placeholder.com/600"}
          collectionName={rssData?.collectionName || "Unknown Podcast"}
          artistName={rssData?.artistName || "Unknown Artist"}
          description={rssData?.description || "No description available."}
        />
      </div>

      <div className="podcast-view__content" data-id="podcast-content">
        <CardContainer>
          <h1 className="podcast-view__title" data-id="podcast-title">
            {item.trackName || "Sin título"}
          </h1>
          <div className="podcast-view__description" data-id="podcast-description">
            {item.description ? parse(item.description) : "No description available."}
          </div>
          <audio
            controls
            className="podcast-view__audio"
            data-id="podcast-audio"
            aria-label="Podcast audio"
          >
            {item.episodeUrl ? (
              <source src={item.episodeUrl} type="audio/mpeg" />
            ) : (
              "Audio no disponible."
            )}
          </audio>
        </CardContainer>
      </div>
    </div>
  );
};

export default PodcastView;
