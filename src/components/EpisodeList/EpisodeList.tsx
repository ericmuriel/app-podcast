import React from "react";
import { useParams, Link } from "react-router-dom";
import { usePodcastData } from "../../hooks/usePodcast";
import { usePodcastEpisodes } from "../../hooks/usePodcastEpisodes";
import "./EpisodeList.scss";
import PodcastInfoCard from "../LateralPodcastInfoCard/LateralPodcastInfoCard";

const EpisodeList: React.FC = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { rssData, isLoading: isPodcastLoading, error: podcastError } = usePodcastData(podcastId!);

  const feedUrl = rssData?.feedUrl || "";
  const { episodes, isLoading: isEpisodesLoading, error: episodesError } = usePodcastEpisodes(feedUrl);

  if (isPodcastLoading) return <div>Cargando información del podcast...</div>;
  if (podcastError) return <div>Error: {podcastError}</div>;
  if (episodesError) return <div>Error al cargar episodios: {episodesError}</div>;
  console.log(episodes);
  return (
    <div className="episode-list">
      <div className="episode-list__sidebar">
        <PodcastInfoCard
          artworkUrl={rssData.artworkUrl600}
          collectionName={rssData.collectionName}
          artistName={rssData.artistName}
          description={rssData.primaryGenreName}
        />
      </div>
      <div className="episode-list__episodes">
      {episodes.length > 0 ?
      <>
      <h3>Episodes: {episodes.length}</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode, index) => (
              <tr key={episode.guid || index}>
                <td>
                  <Link to={`/podcast/${podcastId}/episode/${index}`}>
                    {episode.title}
                  </Link>
                </td>
                <td>{new Date(episode.pubDate).toLocaleDateString()}</td>
                <td>{episode.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
       : <div>Cargando episodios...</div>}
       </div>
    </div>
  );
};

export default EpisodeList;
