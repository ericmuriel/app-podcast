import { fetchWithRetry } from '../fetchWithRetry';

describe('fetchWithRetry', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns response on successful fetch', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: jest.fn(() => Promise.resolve({ message: 'Success' })),
      } as unknown as Response)
    );

    const response = await fetchWithRetry('https://example.com');
    expect(response.ok).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://example.com', {});
  });

  test('retries on failure and eventually throws after max retries', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      } as Response)
    );

    await expect(fetchWithRetry('https://example.com', {}, 2, 100)).rejects.toThrow(
      'HTTP Error: 500'
    );

    expect(fetch).toHaveBeenCalledTimes(3); 
  });

  
});
