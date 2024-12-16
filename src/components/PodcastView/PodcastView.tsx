import React, { useContext } from "react";
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
    return <div className="podcast-view__loading">Cargando episodio...</div>;
  }

  if (error || !episodes) {
    return (
      <div className="podcast-view__error">
        Error al cargar el episodio. Por favor, inténtalo de nuevo.
        <br />
        {error}
      </div>
    );
  }

  const index = parseInt(episodeId || "", 10);
  const item = episodes[index];

  if (!item) {
    return <div className="podcast-view__error">El episodio no existe.</div>;
  }
  setLoading(false);

  return (
    <div className="podcast-view">
      <div className="podcast-view__sidebar">
        <PodcastInfoCard
          artworkUrl={rssData?.artworkUrl600}
          collectionName={rssData?.collectionName}
          artistName={rssData?.artistName}
          description={rssData?.description}
        />
      </div>

      <div className="podcast-view__content">
        <CardContainer>
          <h1 className="podcast-view__title">{item.trackName || "Sin título"}</h1>
          <div className="podcast-view__description">
            {item.description ? parse(item.description) : "No description available."}
          </div>
          <audio controls className="podcast-view__audio">
            <source src={item.episodeUrl} type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </CardContainer>
      </div>
    </div>
  );
};

export default PodcastView;
