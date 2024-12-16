import React from "react";
import { useParams, Link } from "react-router-dom";
import { usePodcastData } from "../../hooks/usePodcast";
import "./EpisodeList.scss";
import PodcastInfoCard from "../LateralPodcastInfoCard/LateralPodcastInfoCard";
import { useLoader } from "../../context/LoaderContext";

const EpisodeList: React.FC = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { setLoading } = useLoader();

  const { rssData, episodes, isLoading, error } = usePodcastData(podcastId!);


  if (isLoading){
    setLoading(true);
    return <div>Cargando información del podcast...</div>;
  } 
  if (error) return <div>Error: {error}</div>;
  if(episodes.length>=50) console.log("⚠️ Only a maximum of 50 episodes are displayed due to API limitations.")
  setLoading(false);

  return (
    <div className="episode-list">
      <div className="episode-list__sidebar">
        <PodcastInfoCard
          artworkUrl={rssData?.artworkUrl600}
          collectionName={rssData?.collectionName}
          artistName={rssData?.artistName}
        />
      </div>

      <div className="episode-list__episodes">
        <h3>Episodes: {episodes.length} </h3>
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
              <tr key={episode.trackId || index}>
                <td>
                  <Link to={`/podcast/${podcastId}/episode/${index}`}>
                    {episode.trackName || "Untitled"}
                  </Link>
                </td>
                <td>
                  {episode.releaseDate
                    ? new Date(episode.releaseDate).toLocaleDateString()
                    : "Unknown Date"}
                </td>
                <td>{episode.trackTimeMillis ? formatDuration(episode.trackTimeMillis) : "Unknown Duration"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper function para formatear duración
const formatDuration = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default EpisodeList;
