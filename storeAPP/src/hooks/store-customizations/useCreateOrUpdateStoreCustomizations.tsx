import { createOrUpdateStoreCustomizations } from "@/services/store-customizations.service";
import { useState } from "react";
interface UseCreateOrUpdateStoreCustomizationsResult {
  isLoading: boolean;
  error: string | null;
  response: any | null;
  createOrUpdate: (data: Record<string, any>) => Promise<void>;
}

export function useCreateOrUpdateStoreCustomizations(): UseCreateOrUpdateStoreCustomizationsResult {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any | null>(null);

  const createOrUpdate = async (data: Record<string, any>): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createOrUpdateStoreCustomizations(data);
      setResponse(result);
    } catch (err: any) {
      setError(
        err.message || "An error occurred while updating store customizations."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrUpdate, isLoading, error, response };
}
