import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createMerchant } from "@/@types/sign-up";
import { useCreateMerchant } from "@/hooks/merchant/useCreateMerchant";
import SignUpComponent from "./sign-up.component";
import { toast } from "react-hot-toast";

export default function SignUpContainer() {
  const { createMerchant: createMerchantRequest, isLoading: isCreatingMerchant } = useCreateMerchant();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  async function handleCreateMerchant(payload: Partial<createMerchant>) {
    if (isProcessing) return; // Evitar múltiplas execuções
    
    setIsProcessing(true);
    console.log("Criando conta:", payload.email);
    
    try {
      // Criar o merchant normalmente
      const result = await createMerchantRequest({
        email: payload.email!,
        password: payload.password!,
      });
      
      console.log("Conta criada com sucesso:", result);
      toast.success("✅ Conta criada com sucesso!");
      
      // Redirecionar para dashboard
      router.push(`/merchant/${result.merchant.id}/dashboard?success=true`);
      
    } catch (error: any) {
      console.error("Erro ao criar conta:", error);
      toast.error(`❌ Erro ao criar conta: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  }

  return <SignUpComponent CreateMerchant={handleCreateMerchant} isLoading={isCreatingMerchant || isProcessing} />;
}
