import { useState, useEffect } from "react";
import { Store } from "@/@types/store";
import { getStoreByIdService } from "@/services/store.service";
import toast from "react-hot-toast";

interface Result {
  store: Store | null;
  message: string;
}

interface UseGetStoreByIdResult {
  store: Store | null;
}

export function useGetStoreById(id: string): UseGetStoreByIdResult {
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        if (!id) {
          setIsLoading(false);
          return;
        }

        const result: Result = await getStoreByIdService(id);
        setStore(result.store);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  return { store };
}
