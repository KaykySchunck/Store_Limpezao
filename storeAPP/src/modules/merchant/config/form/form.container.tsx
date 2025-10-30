"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ConfigFormComponent from "./form.component";
import { configEditType } from "@/@types/config";
import { toast } from "react-hot-toast"; // Importando o toast do react-hot-toast

export default function ConfigFormContainer() {
  const router = useRouter();

  async function handleConfigEdit(payload: Partial<configEditType>) {
    try {
      // await ConfigEditMerchant({
      //   email: payload.email!,
      //   password: payload.password!,
      // });

      toast.success(
        "Recebimento atualizado! Sua recebimento foi atualizado com sucesso."
      );

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      toast.error("Erro ao atualizar o recebimento. Tente novamente.");
    }
  }

  return <ConfigFormComponent configEdit={handleConfigEdit} />;
}
