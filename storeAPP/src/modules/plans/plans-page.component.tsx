"use client";

import { Plan } from "@/services/stripe.service";

interface PlansPageComponentProps {
  plans: Plan[];
  onSelectPlan: (priceId: string, planName: string) => void;
}

export default function PlansPageComponent({ plans, onSelectPlan }: PlansPageComponentProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`relative border rounded-2xl shadow-lg p-8 flex flex-col items-center ${
            plan.name === "Plano Básico"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-105"
              : "bg-white text-gray-800"
          } transition-transform hover:scale-105`}
        >
          {plan.name === "Plano Básico" && (
            <span className="absolute top-3 right-3 bg-yellow-300 text-yellow-900 font-semibold text-xs px-3 py-1 rounded-full uppercase">
              Mais Popular
            </span>
          )}
          <h2
            className={`text-2xl font-bold mb-4 ${
              plan.name === "Plano Básico" ? "text-white" : "text-gray-800"
            }`}
          >
            {plan.name}
          </h2>
          <p
            className={`text-3xl font-extrabold mb-6 ${
              plan.name === "Plano Básico" ? "text-white" : "text-blue-600"
            }`}
          >
            R$ {plan.price}/{plan.interval}
          </p>
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, idx) => (
              <li
                key={idx}
                className={`flex items-center gap-3 ${
                  plan.name === "Plano Básico" ? "text-white" : "text-gray-600"
                }`}
              >
                <span className="text-green-500">✔</span> {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onSelectPlan(plan.id, plan.name)}
            className={`px-6 py-3 rounded-lg font-semibold ${
              plan.name === "Plano Básico"
                ? "bg-white text-blue-600 hover:bg-gray-200"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } transition`}
          >
            Assinar Plano
          </button>
        </div>
      ))}
    </div>
  );
}
