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
      setError("Erro ao autenticar. Tente novamente.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { authMerchantEmail, isLoading, error };
}
