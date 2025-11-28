"use client";

import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function LadingPageHeaderComponent() {
  const router = useRouter();

  return (
    <div
      style={{ padding: "1rem" }}
      className="flex justify-between  items-center"
    >
      <div className="text-xl font-bold bg-slate-500">Store</div>
      <div style={{ gap: "1rem" }} className="flex">
        <div>
          <Button variant="outline" onClick={() => router.push("/login")}>
            Entrar
          </Button>
        </div>
        <div>
          <Button onClick={() => router.push("/sign-up")}>Criar Conta</Button>
        </div>
      </div>
    </div>
  );
}
