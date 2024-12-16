import { CacheService } from '../CacheService';

describe('CacheService', () => {
  const cacheService = CacheService.getInstance();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('setItemWithExpiry and getItemWithExpiry work correctly', () => {
    const key = 'testKey';
    const value = { data: 'testValue' };
    const ttl = 1000;


    jest.spyOn(Date, 'now').mockImplementation(() => 1000);

    cacheService.setItemWithExpiry(key, value, ttl);


    const storedItem = JSON.parse(localStorage.getItem(key)!);
    expect(storedItem.value).toEqual(value);
    expect(storedItem.expiry).toBe(2000);

    expect(cacheService.getItemWithExpiry(key)).toEqual(value);

    jest.spyOn(Date, 'now').mockImplementation(() => 3000);

    expect(cacheService.getItemWithExpiry(key)).toBeNull();
    expect(localStorage.getItem(key)).toBeNull();
  });

  test('getItemWithExpiry handles invalid JSON gracefully', () => {
    const key = 'invalidKey';
    localStorage.setItem(key, 'invalidJSON');

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(cacheService.getItemWithExpiry(key)).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error parsing cache data for key "${key}":`,
      expect.any(SyntaxError)
    );

    consoleErrorSpy.mockRestore();
  });

  test('removeItem removes the item from localStorage', () => {
    const key = 'testKey';
    const value = { data: 'testValue' };

    cacheService.setItemWithExpiry(key, value, 1000);

    expect(localStorage.getItem(key)).not.toBeNull();

    cacheService.removeItem(key);

    expect(localStorage.getItem(key)).toBeNull();
  });
});
