import React from "react";
import { render, screen } from "@testing-library/react";
import PodcastCard from "./PodcastCard";
import PodcastCardProps from "../../types/PodcastCardProps";

describe("PodcastCard Component", () => {
  const mockProps: PodcastCardProps = {
    image: "http://example.com/image.jpg",
    name: "Test Podcast",
    author: "Test Author",
  };

  test("renders PodcastCard with correct props", () => {
    render(<PodcastCard {...mockProps} />);
  
    const image = screen.getByTestId("podcast-card-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.image);
  
    const name = screen.getByTestId("podcast-card-name");
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(mockProps.name.toUpperCase());
  
    const author = screen.getByTestId("podcast-card-author");
    expect(author).toBeInTheDocument();
    expect(author).toHaveTextContent(`Author: ${mockProps.author}`);
  });
  test("renders default values when props are empty", () => {
    render(<PodcastCard image="" name="" author="" />);
  
    const image = screen.getByTestId("podcast-card-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/150");
  
    const name = screen.getByTestId("podcast-card-name");
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent("UNKNOWN PODCAST");
  
    const author = screen.getByTestId("podcast-card-author");
    expect(author).toBeInTheDocument();
    expect(author).toHaveTextContent("Author: Unknown Author");
  });
  
});
