function setLocalStorageWithExpiry(key: string, value: any, ttl: number) {
    const now = Date.now();
    const item = {
      value,
      expiry: now + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  
  function getLocalStorageWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = Date.now();
    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
  