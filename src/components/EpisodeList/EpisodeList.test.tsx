import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EpisodeList from "./EpisodeList";
import { LoaderProvider } from "../../context/LoaderContext";
import { usePodcastData } from "../../hooks/usePodcast";

jest.mock("../../hooks/usePodcast", () => ({
  usePodcastData: jest.fn(),
}));

describe("EpisodeList Component", () => {
  const mockUsePodcastData = usePodcastData as jest.Mock;

  beforeEach(() => {
    mockUsePodcastData.mockReturnValue({
      rssData: {
        artworkUrl600: "http://example.com/image.jpg",
        collectionName: "Test Podcast",
        artistName: "Test Artist",
      },
      episodes: [
        {
          trackId: 1,
          trackName: "Episode 1",
          releaseDate: "2024-01-01",
          trackTimeMillis: 120000,
        },
        {
          trackId: 2,
          trackName: "Episode 2",
          releaseDate: "2024-01-02",
          trackTimeMillis: 150000,
        },
      ],
      isLoading: false,
      error: null,
    });
  });

  it("renders list of episodes correctly", () => {
    render(
      <LoaderProvider>
        <MemoryRouter initialEntries={["/podcast/123"]}>
          <Routes>
            <Route path="/podcast/:podcastId" element={<EpisodeList />} />
          </Routes>
        </MemoryRouter>
      </LoaderProvider>
    );

    expect(screen.getByText("TEST PODCAST")).toBeInTheDocument();
    expect(screen.getByText("by Test Artist")).toBeInTheDocument();


    expect(screen.getByText("Episode 1")).toBeInTheDocument();
    expect(screen.getByText("Episode 2")).toBeInTheDocument();


    expect(screen.getByText("1/1/2024")).toBeInTheDocument();
    expect(screen.getByText("2/1/2024")).toBeInTheDocument();


    expect(screen.getByText("2:00")).toBeInTheDocument();
    expect(screen.getByText("2:30")).toBeInTheDocument();
  });
});
