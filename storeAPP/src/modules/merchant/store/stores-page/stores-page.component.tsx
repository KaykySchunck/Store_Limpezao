"use client";

import { Button } from "@/components/ui";
import ListStoresContainer from "../list-stores/list-stores.container";
import SearchStoreContainer from "../search/search-store.container";
import { useStripeSignUp } from "@/hooks/stripe/useStripe";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface StoresPageComponentProps {
  merchantId: string;
  setIsModalOpenCreate: (isBoolean: boolean) => void;
}

export default function StoresPageComponent({
  merchantId,
  setIsModalOpenCreate,
}: StoresPageComponentProps) {
  const { handleCheckout, isLoading } = useStripeSignUp();
  // Stripe desativada temporariamente: liberar criação de loja sem checagem de assinatura.
  // Para reativar a checagem de assinatura, volte o estado inicial para false e reative os efeitos abaixo.
  const [hasSubscription, setHasSubscription] = useState(true);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true);
  const searchParams = useSearchParams();

  // Stripe desativada temporariamente: não realizar checagem de assinatura no carregamento.
  // Para reativar, descomente o bloco abaixo.
  // useEffect(() => {
  //   checkSubscription();
  // }, []);

  // Recarregar verificação quando subscription=success
  // Stripe desativada temporariamente: não reagendar checagem por query param.
  // Para reativar, descomente o bloco abaixo.
  // useEffect(() => {
  //   const subscription = searchParams.get("subscription");
  //   if (subscription === "success") {
  //     // Aguardar um pouco para o webhook processar
  //     setTimeout(() => {
  //       checkSubscription();
  //     }, 1000);
  //   }
  // }, [searchParams]);

  const checkSubscription = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/stripe/check-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId }),
      });

      if (response.ok) {
        const data = await response.json();
        setHasSubscription(data.hasSubscription);
      } else {
        setHasSubscription(false);
      }
    } catch (error) {
      console.error('Erro ao verificar subscription:', error);
      setHasSubscription(false);
    } finally {
      setIsCheckingSubscription(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      const successUrl = `${window.location.origin}/merchant/${merchantId}/dashboard?subscription=success`;
      const cancelUrl = `${window.location.origin}/merchant/${merchantId}/dashboard?subscription=canceled`;

      await handleCheckout('premium', merchantId, successUrl, cancelUrl);
      toast.success("Redirecionando para pagamento...");
    } catch (error: any) {
      console.error("Erro ao iniciar checkout:", error);
      toast.error(`❌ Erro ao processar pagamento: ${error}`);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-gray-800 font-semibold text-2xl">Lojas</h1>
      <div className="flex items-start my-2 justify-between">
        <SearchStoreContainer />
        <div className="flex items-center gap-3">
          {/* Stripe desativada temporariamente: botão de criar loja sempre visível.
              Para reativar a exigência de assinatura, volte para a condição {hasSubscription && ( <Button>... ) } */}
            <Button onClick={() => setIsModalOpenCreate(true)}>
              Adicionar Loja
            </Button>
          
          {/* Stripe desativada temporariamente: esconder CTA de assinatura.
              Para reativar, descomente o bloco abaixo.
          {!hasSubscription && !isCheckingSubscription && (
            <Button 
              onClick={handleSubscribe}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 ml-2 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Assinar Plano Premium
                </div>
              )}
            </Button>
          )}
          */}
        </div>
      </div>
      <ListStoresContainer merchantId={merchantId} />
    </div>
  );
}
