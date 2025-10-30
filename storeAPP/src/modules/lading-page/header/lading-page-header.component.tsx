import { Button } from "@/components/ui";

export default function LadingPageHeaderComponent() {
  return (
    <div
      style={{ padding: "1rem" }}
      className="flex justify-between  items-center"
    >
      <div className="text-xl font-bold bg-slate-500">Store</div>
      <div style={{ gap: "1rem" }} className="flex">
        <div>
          <Button variant="outline">Entrar</Button>
        </div>
        <div>
          <Button>Criar Conta</Button>
        </div>
      </div>
    </div>
  );
}
