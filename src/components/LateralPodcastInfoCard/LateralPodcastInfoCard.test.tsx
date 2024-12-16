import React from "react";
import { render, screen } from "@testing-library/react";
import PodcastInfoCard from "./LateralPodcastInfoCard";
import { PodcastInfoCardProps } from "./types";

const mockProps: PodcastInfoCardProps = {
  artworkUrl: "http://example.com/artwork.jpg",
  collectionName: "Test Podcast",
  artistName: "Test Artist",
};

describe("PodcastInfoCard Component", () => {
  test("renders PodcastInfoCard with correct data", () => {
    render(<PodcastInfoCard {...mockProps} />);

    const image = screen.getByAltText("Test Podcast");
    expect(image).toBeInTheDocument();

    const title = screen.getByText("TEST PODCAST");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("podcast-sidebar__title");

    const artist = screen.getByText("by Test Artist");
    expect(artist).toBeInTheDocument();
    expect(artist).toHaveClass("podcast-sidebar__artist");
  });

    test("renders correctly when props are missing", () => {
    render(<PodcastInfoCard artworkUrl="" collectionName="" artistName="" />);

    const image = screen.getByRole("img", { name: /podcast artwork/i });
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/150");
    expect(image).toBeInTheDocument();

    const defaultTitle = screen.getByText("UNKNOWN PODCAST");
    expect(defaultTitle).toBeInTheDocument();

    const defaultArtist = screen.getByText("by Unknown Artist");
    expect(defaultArtist).toBeInTheDocument();
    });
  
});
