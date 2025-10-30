"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function SignUpWithParams() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    if (canceled === "true") {
      toast.error("❌ Pagamento cancelado. Sua conta foi criada mas precisa ser ativada.");
    }
  }, [canceled]);

  return null; // Este componente só lida com os params, não renderiza nada
} 