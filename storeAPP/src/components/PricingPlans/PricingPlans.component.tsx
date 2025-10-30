import { useEffect } from "react";
import { usePlans, useStripe } from "@/hooks/stripe/useStripe";
import { Button } from "@/components/ui";
import { Check, Crown, Star, Lightning } from "@phosphor-icons/react";
import toast from "react-hot-toast";

export default function PricingPlansComponent() {
  const { plans, fetchPlans, isLoading, error } = usePlans();
  const { handleCheckout, isLoading: isCheckoutLoading } = useStripe();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleSelectPlan = async (priceId: string, planName: string) => {
    try {
      await handleCheckout(priceId);
      toast.success(`Redirecionando para checkout do ${planName}...`);
    } catch (error) {
      toast.error("Erro ao processar pagamento");
    }
  };

  const getPlanIcon = (planName: string) => {
    return <Crown size={32} className="text-purple-500" />;
  };

  const getPlanBadge = (planName: string) => {
    return (
      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
        Premium
      </span>
    );
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

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Plano Premium Completo
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Tudo que você precisa para criar e gerenciar suas lojas online
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full ring-2 ring-purple-500 transform scale-105"
            >
              {getPlanBadge(plan.name) && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  {getPlanBadge(plan.name)}
                </div>
              )}

              <div className="flex items-center justify-center mb-6">
                {getPlanIcon(plan.name)}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                {plan.name}
              </h3>

              <div className="text-center mb-8">
                <span className="text-4xl font-bold text-gray-900">
                  R$ {plan.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-gray-500">/mês</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check
                      size={20}
                      className="text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSelectPlan(plan.id, plan.name)}
                disabled={isCheckoutLoading}
                className="w-full bg-purple-500 hover:bg-purple-600"
              >
                {isCheckoutLoading ? "Processando..." : "Começar Agora"}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Todos os planos incluem 7 dias de teste gratuito. Cancele a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
} 