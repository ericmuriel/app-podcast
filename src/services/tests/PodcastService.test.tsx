import { PodcastService } from '../PodcastService';

describe('PodcastService', () => {
  test('fetchAllPodcasts fetches and returns podcasts', async () => {
    const mockResponse = {
      feed: {
        entry: [
          {
            id: { attributes: { "im:id": "123" } },
            "im:name": { label: "Podcast 1" },
            "im:artist": { label: "Artist 1" },
            "im:image": [{ label: "https://example.com/image1.jpg" }],
          },
        ],
      },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: jest.fn(() => Promise.resolve(mockResponse)),
      } as unknown as Response)
    );

    const podcastService = PodcastService.getInstance();
    const podcasts = await podcastService.fetchAllPodcasts();

    expect(fetch).toHaveBeenCalledWith(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
    );
    expect(podcasts).toEqual(mockResponse.feed.entry);
  });
});
