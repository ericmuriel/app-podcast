import React from "react";
import { useParams, Link } from "react-router-dom";
import parse from "html-react-parser";
import "./EpisodeList.scss";
import CardContainer from "../CardContainer/CardContainer";
import { Item } from "../../types/RSSData";
import { usePodcastRSS } from "../../hooks/usePodcastRss";

const EpisodeList: React.FC = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const rssUrl = `https://itunes.apple.com/lookup?id=${podcastId}`;  
  const { rssData, isLoading, error } = usePodcastRSS(rssUrl);

  if (isLoading) {
    return <div className="episode-list__loading">Cargando episodios...</div>;
  }

  if (error) {
    return (
      <div className="episode-list__error">
        Error al cargar episodios. Por favor, inténtalo de nuevo.
        <br />
        {error}
      </div>
    );
  }

  return (
    <div className="episode-list">
      <CardContainer className="episode-list__summary">
        <span className="episode-list__title">
          Episodes: {rssData?.items.length || 0}
        </span>
      </CardContainer>

      <CardContainer>
        <table className="episode-list__table">
          <thead>
            <tr>
              <th className="episode-list__header">Title</th>
              <th className="episode-list__header">Date</th>
              <th className="episode-list__header">Duration</th>
            </tr>
          </thead>
          <tbody>
            {rssData?.items.map((row: Item, i: number) => (
              <tr key={row.guid["#text"]} className="episode-list__row">
                <td>
                  <Link
                    to={`/podcast/${podcastId}/episode/${i}`}
                    className="episode-list__link"
                  >
                    {parse(row.title["#text"] || "")}
                  </Link>
                </td>
                <td>
                  {row.pubDate["#text"]
                    ? new Date(row.pubDate["#text"]).toLocaleDateString("en-US")
                    : "N/A"}
                </td>
                <td>{row["itunes:duration"]["#text"] || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContainer>
    </div>
  );
};

export default EpisodeList;
