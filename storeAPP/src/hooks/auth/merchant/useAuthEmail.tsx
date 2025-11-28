import { merchantSignInPayload } from "@/@types/sign-in";
import { loginAuthEmailService } from "@/services/auth.service";
import { useState } from "react";

export function useAuthEmail() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const authMerchantEmail = async (authData: merchantSignInPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await loginAuthEmailService(authData);
      return result;
    } catch (err: any) {
      const errorMessage = err?.message || "Erro ao autenticar. Tente novamente.";
      setError(errorMessage);
      // Propaga o erro para que o container possa tratá-lo
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { authMerchantEmail, isLoading, error };
}
