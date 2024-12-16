export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries: number = 3,
  delay: number = 1000
): Promise<Response> => {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response;
    } catch (err) {
      if (i === retries) {
        console.error(`Fetch failed after ${retries + 1} attempts:`, err);
        throw err; 
      }
      console.warn(`Retry ${i + 1} after error:`, err);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Unreachable code reached");
};
