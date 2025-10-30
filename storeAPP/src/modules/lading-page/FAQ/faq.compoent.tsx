import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui";

const faqs = [
  {
    question: "O que é o nosso SaaS?",
    answer:
      "Nosso SaaS é uma solução baseada na nuvem que ajuda sua empresa a gerenciar processos de forma eficiente.",
  },
  {
    question: "Quais são os planos disponíveis?",
    answer:
      "Temos planos Básico, Profissional e Empresarial. Cada um oferece diferentes níveis de funcionalidades.",
  },
];

export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
      <div style={{ gap: "3rem" }} className="flex items-center justify-center">
        <div className="m-4 text-left">
          <h1
            style={{ width: "30rem" }}
            className="text-4xl font-bold mb-4 text-blue-700"
          >
            Perguntas frequentes
          </h1>
          <div style={{ width: "32rem" }}>
            <p className="text-gray-500 text-left leading-relaxed text-base mb-4">
              Reunimos abaixo algumas perguntas frequentes e suas respectivas
              respostas para auxiliar na sua tomada de decisão.
            </p>
          </div>
        </div>

        <div style={{ width: "30rem" }} className="p-6">
          <div className="">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b  rounded-lg overflow-hidden shadow-md"
              >
                <button
                  style={{ padding: "1rem" }}
                  className="flex justify-between items-center w-full text-lg font-medium"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </button>
                {openIndex === index && (
                  <div
                    style={{ padding: "1rem" }}
                    className="bg-white border-t border-gray-200"
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
