import React from "react";
import "./LateralPodcastInfoCard.scss";
import { PodcastInfoCardProps } from "./types";

const PodcastInfoCard: React.FC<PodcastInfoCardProps> = ({
  artworkUrl,
  collectionName,
  artistName,
}) => {
  return (
    <div className="podcast-sidebar" data-id="podcast-card">
      <img
        src={artworkUrl || "https://via.placeholder.com/150"} 
        alt={collectionName || "Podcast artwork"}
        className="podcast-sidebar__image"
      />
      <h2 className="podcast-sidebar__title">
        {collectionName?.toLocaleUpperCase() || "UNKNOWN PODCAST"}
      </h2>
      <h2 className="podcast-sidebar__artist">
        {artistName ? `by ${artistName}` : "by Unknown Artist"}
      </h2>
    </div>
  );
};
export default PodcastInfoCard;
