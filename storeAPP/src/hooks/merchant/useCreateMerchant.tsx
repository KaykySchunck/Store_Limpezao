import { createMerchantPayload } from "@/@types/merchant";
import { createMerchantService } from "@/services/merchant.service";
import { useState } from "react";

export function useCreateMerchant() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const createMerchant = async (merchantData: createMerchantPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createMerchantService(merchantData);
      setData(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || err || "Erro desconhecido";
      setError(errorMessage);
      throw err; // Re-throw para que o container possa capturar
    } finally {
      setIsLoading(false);
    }
  };

  return { createMerchant, isLoading, error, data };
}
