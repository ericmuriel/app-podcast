import React from "react";
import "./LateralPodcastInfoCard.scss";
import { PodcastInfoCardProps } from "./types";

const PodcastInfoCard: React.FC<PodcastInfoCardProps> = ({
  artworkUrl,
  collectionName,
  artistName,
}) => {
  return (
    <div className="podcast-sidebar">
      <img
        src={artworkUrl}
        alt={collectionName}
        className="podcast-sidebar__image"
      />
      <h2 className="podcast-sidebar__title">{collectionName.toLocaleUpperCase()}</h2>
      <h2 className="podcast-sidebar__artist">by {artistName}</h2>
    </div>
  );
};

export default PodcastInfoCard;
