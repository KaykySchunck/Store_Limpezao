import { useState } from "react";
import { createCheckoutSession, createPortalSession, getPlans, Plan } from "@/services/stripe.service";
import { useStoreContext } from "@/modules/contexts/store-context/store-context";

export function useStripe() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { store } = useStoreContext();

  const handleCheckout = async (priceId: string, customSuccessUrl?: string, customCancelUrl?: string, customMerchantId?: string) => {
    const merchantId = customMerchantId || store?.merchantId;
    
    if (!merchantId) {
      setError("Merchant ID não encontrado");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const successUrl = customSuccessUrl || `${window.location.origin}/merchant/${merchantId}/dashboard?success=true`;
      const cancelUrl = customCancelUrl || `${window.location.origin}/merchant/${merchantId}/dashboard?canceled=true`;

      const result = await createCheckoutSession({
        merchantId: merchantId,
        priceId,
        successUrl,
        cancelUrl,
      });

      // Redirecionar para o checkout
      window.location.href = result.url;
      return result;
    } catch (err: any) {
      setError(err.message || "Erro ao criar sessão de checkout");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePortalAccess = async () => {
    if (!store?.merchantId) {
      setError("Merchant ID não encontrado");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const returnUrl = `${window.location.origin}/merchant/${store.merchantId}/dashboard`;

      const result = await createPortalSession({
        merchantId: store.merchantId,
        returnUrl,
      });

      // Redirecionar para o portal
      window.location.href = result.url;
      return result;
    } catch (err: any) {
      setError(err.message || "Erro ao acessar portal");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCheckout,
    handlePortalAccess,
    isLoading,
    error,
  };
}

// Hook específico para sign-up que não depende do StoreProvider
export function useStripeSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, merchantId: string, successUrl: string, cancelUrl: string) => {
    if (!merchantId) {
      setError("Merchant ID não encontrado");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await createCheckoutSession({
        merchantId: merchantId,
        priceId,
        successUrl,
        cancelUrl,
      });

      // Redirecionar para o checkout
      window.location.href = result.url;
      return result;
    } catch (err: any) {
      setError(err.message || "Erro ao criar sessão de checkout");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCheckout,
    isLoading,
    error,
  };
}

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getPlans();
      setPlans(result.plans);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar planos");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    plans,
    fetchPlans,
    isLoading,
    error,
  };
} 