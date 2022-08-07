import { useCallback, useState } from 'react';

export default function useFetch<T>() {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (url: string, options: RequestInit = {}) => {
    const mergedOptions: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      ...options,
    };
    setIsLoading(true);
    try {
      const response = await fetch(url, mergedOptions);
      const data = (await response.json()) as T;

      setData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        return;
      }
      setError('Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchData, data, error, isLoading };
}
