import React from "react";
import "./PodcastCard.scss";
import PodcastCardProps from "../../types/PodcastCardProps";
import CardContainer from "../CardContainer/CardContainer";

const PodcastCard: React.FC<PodcastCardProps> = ({
  image,
  name = "Unknown Podcast",
  author = "Unknown Author",
}) => {
  const resolvedImage = image || "https://via.placeholder.com/150";
  const resolvedName = name.trim() ? name : "Unknown Podcast";
  const resolvedAuthor = author.trim() ? author : "Unknown Author";
  return (
    <CardContainer>
      <div className="podcast-card" data-testid="podcast-card">
        <img
          src={resolvedImage}
          alt={resolvedName}
          className="podcast-card__image"
          data-testid="podcast-card-image"
        />
        <p className="podcast-card__name" data-testid="podcast-card-name">
          {resolvedName.toUpperCase()}
        </p>
        <p className="podcast-card__author" data-testid="podcast-card-author">
          Author: {resolvedAuthor}
        </p>
      </div>
    </CardContainer>
  );
};

export default PodcastCard;