import { useState, useEffect } from "react";
import { getStoreByMerchantIdService } from "@/services/store.service";
import { Store } from "@/@types/store";

interface Result {
  stores: Store[];
  message: string;
}

interface UseGetStoreByMerchantIdResult {
  stores: Store[] | null;
  error: string | null;
  message: string | null;
  isLoading: boolean;
}

export function useGetStoreByMerchantId(
  merchantId: string
): UseGetStoreByMerchantIdResult {
  const [stores, setStores] = useState<Store[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        if (!merchantId) {
          setError("Merchant ID is required");
          setIsLoading(false);
          return;
        }

        const result: Result = await getStoreByMerchantIdService(merchantId);
        setStores(result.stores);
        setMessage(result.message);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching stores.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStore();
  }, [merchantId]);

  return { stores, error, message, isLoading };
}
