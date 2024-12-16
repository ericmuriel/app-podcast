import { renderHook, waitFor } from '@testing-library/react';
import { PodcastService } from '../../services/PodcastService';
import { CacheService } from '../../services/CacheService';
import { usePodcastsEpisodes } from '../usePodcastEpisodes';

jest.mock('../../services/PodcastService', () => ({
  PodcastService: {
    getInstance: jest.fn(() => ({
      fetchAllPodcasts: jest.fn(),
    })),
  },
}));

jest.mock('../../services/CacheService', () => ({
  CacheService: {
    getInstance: jest.fn(() => ({
      getItemWithExpiry: jest.fn(),
      setItemWithExpiry: jest.fn(),
    })),
  },
}));

describe('usePodcastsEpisodes', () => {
  const mockFetchAllPodcasts = jest.fn();
  const mockGetItemWithExpiry = jest.fn();
  const mockSetItemWithExpiry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (PodcastService.getInstance as jest.Mock).mockReturnValue({
      fetchAllPodcasts: mockFetchAllPodcasts,
    });
    (CacheService.getInstance as jest.Mock).mockReturnValue({
      getItemWithExpiry: mockGetItemWithExpiry,
      setItemWithExpiry: mockSetItemWithExpiry,
    });
  });

  test('uses cached data if available', async () => {
    const cachedPodcasts = [{ id: '1', name: 'Test Podcast' }];
    mockGetItemWithExpiry.mockReturnValue(cachedPodcasts);

    const { result } = renderHook(() => usePodcastsEpisodes());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.podcasts).toEqual(cachedPodcasts);
    expect(mockGetItemWithExpiry).toHaveBeenCalledWith('allPodcasts');
    expect(mockFetchAllPodcasts).not.toHaveBeenCalled();
  });

  test('fetches and caches data if no cached data exists', async () => {
    const fetchedPodcasts = [{ id: '2', name: 'Fetched Podcast' }];
    mockGetItemWithExpiry.mockReturnValue(null);
    mockFetchAllPodcasts.mockResolvedValue(fetchedPodcasts);

    const { result } = renderHook(() => usePodcastsEpisodes());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.podcasts).toEqual(fetchedPodcasts);
    expect(mockGetItemWithExpiry).toHaveBeenCalledWith('allPodcasts');
    expect(mockFetchAllPodcasts).toHaveBeenCalled();
    expect(mockSetItemWithExpiry).toHaveBeenCalledWith(
      'allPodcasts',
      fetchedPodcasts,
      86400000
    );
  });

  test('sets error state if fetch fails', async () => {
    const errorMessage = 'Network error';
    mockGetItemWithExpiry.mockReturnValue(null);
    mockFetchAllPodcasts.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => usePodcastsEpisodes());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.podcasts).toEqual([]);
    expect(mockFetchAllPodcasts).toHaveBeenCalled();
  });
});
