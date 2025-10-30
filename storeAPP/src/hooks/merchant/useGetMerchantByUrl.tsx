import { useState } from "react";
import { getMerchantByUrlService } from "@/services/merchant.service";

export function useGetMerchantByUrl() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const getMerchantByUrl = async (url: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getMerchantByUrlService(url);
      setData(result);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { getMerchantByUrl, isLoading, error, data };
}
