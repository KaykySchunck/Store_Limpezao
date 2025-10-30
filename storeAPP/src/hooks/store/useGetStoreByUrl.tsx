import { useState, useEffect } from "react";
import { Store } from "@/@types/store";
import { getStoreByUrlService } from "@/services/store.service";

interface Result {
  store: Store | null;
  message: string;
}

interface UseGetStoreByUrlResult {
  store: Store | null;
  error: string | null;
  message: string | null;
  isLoading: boolean;
}

export function useGetStoreByUrl(url: string): UseGetStoreByUrlResult {
  const [store, setStore] = useState<Store | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        if (!url) {
          setError("URL is required");
          setIsLoading(false);
          return;
        }

        const result: Result = await getStoreByUrlService(url);
        setStore(result.store);
        setMessage(result.message);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the store.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStore();
  }, [url]);

  return { store, error, message, isLoading };
}
