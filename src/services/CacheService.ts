export class CacheService {
    private static instance: CacheService;
  
    private constructor() {}
  
    public static getInstance(): CacheService {
      if (!CacheService.instance) {
        CacheService.instance = new CacheService();
      }
      return CacheService.instance;
    }
  
    public setItemWithExpiry(key: string, value: any, ttl: number) {
      const now = Date.now();
      const item = {
        value,
        expiry: now + ttl,
      };
      localStorage.setItem(key, JSON.stringify(item));
    }
  
    public getItemWithExpiry(key: string) {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) return null;
  
      try {
        const item = JSON.parse(itemStr);
        const now = Date.now();
  
        if (now > item.expiry || !item.value || Object.keys(item.value).length === 0) {
          localStorage.removeItem(key);
          return null;
        }
        return item.value;
      } catch (error) {
        console.error(`Error parsing cache data for key "${key}":`, error);
        return null;
      }
    }
  
    public removeItem(key: string) {
      localStorage.removeItem(key);
    }
  }
  