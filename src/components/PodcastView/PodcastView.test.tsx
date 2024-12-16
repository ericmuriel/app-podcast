import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PodcastView from "./PodcastView";
import { LoaderProvider } from "../../context/LoaderContext";

jest.mock("../../hooks/usePodcast", () => ({
  usePodcastData: jest.fn(() => ({
    rssData: null,
    episodes: null,
    isLoading: true,
    error: null,
  })),
}));

describe("PodcastView", () => {
  test("renders loading state", () => {
    render(
      <LoaderProvider>
        <MemoryRouter initialEntries={["/podcast/1/2"]}>
          <Routes>
            <Route path="/podcast/:podcastId/:episodeId" element={<PodcastView />} />
          </Routes>
        </MemoryRouter>
      </LoaderProvider>
    );

    expect(screen.getByText("Cargando episodio...")).toBeInTheDocument();
  });
});
