import React from "react";
import "./LateralPodcastInfoCard.scss";
import { PodcastInfoCardProps } from "./types";

const PodcastInfoCard: React.FC<PodcastInfoCardProps> = ({
  artworkUrl,
  collectionName,
  artistName,
  description,
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
      <p className="podcast-sidebar__description">{description}</p>
    </div>
  );
};

export default PodcastInfoCard;
