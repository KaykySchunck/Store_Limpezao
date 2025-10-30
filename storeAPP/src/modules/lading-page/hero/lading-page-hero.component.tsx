import { Button } from "@/components/ui";

export default function LandingPageHeroComponent() {
  return (
    <div
      style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
      className="flex flex-col items-center justify-center"
    >
      <div>
        <div style={{ width: "55rem" }}>
          <h1
            style={{ fontSize: "48px", lineHeight: "normal" }}
            className="font-bold text-center mb-4"
          >
            Seu catálogo online pronto em 5 minutos – vendas diretas no
            WhatsApp!
          </h1>
        </div>
      </div>
      <div style={{ width: "850px" }}>
        <p className="text-center text-gray-500 text-xl">
          Crie sua loja virtual em minutos e personalize tudo do seu jeito, sem
          precisar de conhecimentos técnicos. Comece a vender online com total
          liberdade. Sem taxas escondidas
        </p>
      </div>
      <div className="flex items-center justify-center mt-6">
        <div>
          <Button>Cadastre-se agora mesmo!</Button>
        </div>
      </div>
    </div>
  );
}
