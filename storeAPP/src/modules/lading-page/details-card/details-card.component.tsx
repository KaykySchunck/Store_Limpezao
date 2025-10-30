import { Button } from "@/components/ui";
import CardMultiStoresContainer from "../card-multi-stores/card-multi-stores.container";

export default function DetailsCardComponent() {
  return (
    <div style={{ marginTop: "3rem", width: "60rem" }} className="m-2">
      <div style={{ gap: "3rem" }} className="flex items-center justify-center">
        <div className="m-4 text-left">
          <h1
            style={{ width: "30rem" }}
            className="text-4xl font-bold text-gray-800 mb-4 transition-colors duration-300 hover:text-blue-600"
          >
            Edição do layout da loja extremamente simples
          </h1>
          <div style={{ width: "32rem" }}>
            <p className="text-gray-500 text-left leading-relaxed text-base mb-4">
              Imagine mudar completamente o layout da sua loja com poucos
              cliques, de maneira intuitiva e sem complicação. Em minutos, tenha
              um visual exclusivo, personalizado para a sua marca, oferecendo
              uma experiência única aos seus clientes.
            </p>
          </div>
          <div>
            <Button>Cadastrar-se agora</Button>
          </div>
        </div>

        <div className="flex-shrink-0">
          <img
            src="/images/editingStore.webp"
            alt="Imagem das lojas"
            className="rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 w-full max-w-[300px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}
