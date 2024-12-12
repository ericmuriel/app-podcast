import React from "react";
import "./PodcastCard.scss";
import PodcastCardProps from "../../types/PodcastCardProps";
import CardContainer from "../CardContainer/CardContainer";

const PodcastCard: React.FC<PodcastCardProps> = ({ image, name, author }) => {
  return (
    <CardContainer>
      <div className="podcast-card">
        <img src={image} alt={name} className="podcast-card__image" />
        <p className="podcast-card__name">{name.toUpperCase()}</p>
        <p className="podcast-card__author">Author: {author}</p>
      </div>
    </CardContainer>
  );
};

export default PodcastCard;
