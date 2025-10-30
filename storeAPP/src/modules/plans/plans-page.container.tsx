"use client";

import PlansPageComponent from "./plans-page.component";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPlans, Plan } from "@/services/stripe.service";

export default function PlansPageContainer() {
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

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSelectPlan = async (priceId: string, planName: string) => {
    try {
      // Para a página de planos, vamos redirecionar para sign-up
      window.location.href = `/sign-up?plan=${priceId}`;
      toast.success(`Redirecionando para criar conta com ${planName}...`);
    } catch (error) {
      toast.error("Erro ao processar seleção do plano");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Erro ao carregar planos: {error}</p>
      </div>
    );
  }

  return <PlansPageComponent plans={plans} onSelectPlan={handleSelectPlan} />;
}
