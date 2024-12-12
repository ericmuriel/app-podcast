import React from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import "./PodcastView.scss";
import CardContainer from "../CardContainer/CardContainer";
import { usePodcastEpisodes } from "../../hooks/usePodcastEpisodes";

const PodcastView: React.FC = () => {
  const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>();

  const { episodes, isLoading, error } = usePodcastEpisodes(`https://itunes.apple.com/lookup?id=${podcastId}`);

  if (isLoading) {
    return <div className="podcast-view__loading">Cargando episodio...</div>;
  }

  if (error) {
    return (
      <div className="podcast-view__error">
        Error al cargar el episodio. Por favor, inténtalo de nuevo.
        <br />
        {error}
      </div>
    );
  }

  if (!episodes || episodes.length === 0) {
    return <div className="podcast-view__error">No se encontraron episodios para este podcast.</div>;
  }

  console.log("Episodes:", episodes);
  console.log("Episode ID:", episodeId);

  const index = parseInt(episodeId || "", 10);
  const item = episodes[index];

  if (!item) {
    return <div className="podcast-view__error">El episodio no existe.</div>;
  }

  return (
    <section className="podcast-view">
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
    </section>
  );
};

export default PodcastView;
