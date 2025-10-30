import { useState, useEffect } from "react";
import { getStoreCustomizationsByStoreId } from "@/services/store-customizations.service";

interface Result {
  data: any;
  message: string;
}

interface UseGetStoreCustomizationsResult {
  data: any | null;
  error: string | null;
  message: string | null;
  isLoading: boolean;
}

export function useGetStoreCustomizationsByStoreId(
  storeId: string
): UseGetStoreCustomizationsResult {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStoreCustomizations = async () => {
      try {
        if (!storeId) {
          setError("Store ID is required");
          setIsLoading(false);
          return;
        }

        const result = await getStoreCustomizationsByStoreId(storeId);
        setData(result.storeCustomizations);
        setMessage(result.message);
      } catch (err: any) {
        setError(
          err.message ||
            "An error occurred while fetching store customizations."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreCustomizations();
  }, [storeId]);

  return { data, error, message, isLoading };
}
