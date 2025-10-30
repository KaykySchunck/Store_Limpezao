import { Button } from "@/components/ui";
import { Check } from "@phosphor-icons/react";

export default function PlansComponent() {
  const plans = [
    {
      name: "Plano Padrão",
      price: "R$ 69,90/mês",
      features: [
        "Cadastro ilimitado de produtos no catálogo",
        "Página personalizada para a loja",
        "Compra redirecionada para o WhatsApp",
        "Edição e personalização completa da loja",
        "Configuração rápida da loja em até 5 minutos",
        "Suporte via WhatsApp e e-mail",
      ],
    },
  ];

  return (
    <div style={{ marginTop: "3rem" }}>
      <div style={{ gap: "3rem" }} className="flex items-center justify-center">
        <div className="max-w-lg text-left text-white">
          <h1 className="text-4xl font-bold  mb-4 transition-colors duration-300 hover:text-blue-600">
            Assine a plataforma
          </h1>
          <p className="leading-relaxed text-base mt-4">
            Imagine seus clientes navegando por um catálogo impecável,
            escolhendo seus produtos favoritos e fechando a compra diretamente
            pelo WhatsApp. Mais praticidade para você e mais vendas para o seu
            negócio!
          </p>
          <p className="leading-relaxed text-base mt-4 font-semibold">
            Não perca tempo! Assine agora e tenha tudo o que precisa para vender
            online de forma simples, rápida e eficiente. Comece hoje mesmo!
          </p>
        </div>

        <div>
          {plans.map((plan) => (
            <div
              style={{ border: "1px solid blue", borderRadius: "12px" }}
              key={plan.name}
              className="p-8 rounded-2xl text-cente shadow-md bg-white text-black"
            >
              <h2 className="text-2xl font-extrabold text-gray-800">
                {plan.name}
              </h2>
              <p className="text-xl text-gray-700 mt-3 font-semibold">
                {plan.price}
              </p>
              <ul className="mt-6 text-gray-600 text-left text-lg space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check color="darkblue" size={20} /> {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full py-2 text-lg font-medium">
                Quero Assinar Agora
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
``;
