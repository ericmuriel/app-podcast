import { renderHook, waitFor } from '@testing-library/react';
import { PodcastService } from '../../services/PodcastService';
import { usePodcastData } from '../usePodcast';

jest.mock('../../services/PodcastService', () => ({
  PodcastService: {
    getInstance: jest.fn(() => ({
      fetchPodcastById: jest.fn(),
      fetchEpisodesByPodcastId: jest.fn(),
    })),
  },
}));

describe('usePodcastData', () => {
  const mockFetchPodcastById = jest.fn();
  const mockFetchEpisodesByPodcastId = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (PodcastService.getInstance as jest.Mock).mockReturnValue({
      fetchPodcastById: mockFetchPodcastById,
      fetchEpisodesByPodcastId: mockFetchEpisodesByPodcastId,
    });
  });

  test('fetches and sets podcast data correctly', async () => {
    const podcastId = '123';
    const mockPodcastData = { id: '123', name: 'Test Podcast' };
    const mockEpisodesData = [
      { id: '1', title: 'Episode 1' },
      { id: '2', title: 'Episode 2' },
    ];

    mockFetchPodcastById.mockResolvedValueOnce(mockPodcastData);
    mockFetchEpisodesByPodcastId.mockResolvedValueOnce(mockEpisodesData);

    const { result } = renderHook(() => usePodcastData(podcastId));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.rssData).toEqual(mockPodcastData);
    expect(result.current.episodes).toEqual(mockEpisodesData);
    expect(result.current.error).toBeNull();

    expect(mockFetchPodcastById).toHaveBeenCalledWith(podcastId);
    expect(mockFetchEpisodesByPodcastId).toHaveBeenCalledWith(podcastId);
  });

  test('sets error state when fetch fails', async () => {
    const podcastId = '123';
    const errorMessage = 'Failed to fetch';

    mockFetchPodcastById.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => usePodcastData(podcastId));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.rssData).toBeNull();
    expect(result.current.episodes).toEqual([]);
  });

  test('does nothing when podcastId is not provided', async () => {
    const { result } = renderHook(() => usePodcastData(''));

    expect(result.current.rssData).toBeNull();
    expect(result.current.episodes).toEqual([]);
    expect(result.current.error).toBeNull();

    expect(mockFetchPodcastById).not.toHaveBeenCalled();
    expect(mockFetchEpisodesByPodcastId).not.toHaveBeenCalled();
  });
});
