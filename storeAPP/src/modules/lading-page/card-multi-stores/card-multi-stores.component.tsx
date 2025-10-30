import { Button } from "@/components/ui";

export default function CardMultiStoresComponent() {
  return (
    <div
      style={{ gap: "3rem", width: "60rem" }}
      className="flex items-center justify-center"
    >
      <div>
        <img
          src="/images/multistores.webp"
          alt="Imagem das lojas"
          style={{ width: "770px", height: "350px", objectFit: "cover" }}
          className="rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      <div className="m-4 text-left">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 transition-colors duration-300 hover:text-blue-600">
          Você tem mais de uma loja?
        </h1>
        <div style={{ width: "32rem" }}>
          <p className="text-gray-500 text-left leading-relaxed text-base mb-4">
            Com nossa plataforma, você gerencia várias lojas de uma só conta.
            Organize seu portfólio, monitore o desempenho de cada uma e
            aproveite recursos exclusivos para otimizar seu tempo e resultados,
            sem complicação.
          </p>
        </div>
        <div>
          <Button>Cadastrar-se agora</Button>
        </div>
      </div>
    </div>
  );
}
