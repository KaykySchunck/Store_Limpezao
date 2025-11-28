import { merchantSignInPayload } from "@/@types/sign-in";
import { SignInComponent } from "./sign-in.component";
import { useAuthEmail } from "@/hooks/auth/merchant/useAuthEmail";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export function SignInContainer() {
  const { authMerchantEmail, isLoading } = useAuthEmail();
  const router = useRouter();

  async function handleSignIn(payload: Partial<merchantSignInPayload>) {
    try {
      if (!payload.email || !payload.password) {
        toast.error("Por favor, preencha todos os campos.");
        return;
      }

      const res = await authMerchantEmail(payload as merchantSignInPayload);

      if (!res || !res.data) {
        toast.error("E-mail ou senha incorretos. Tente novamente.");
        return;
      }

      localStorage.setItem("store@token", res.data.token);
      toast.success("Login realizado com sucesso!");
      router.push(`/merchant/${res.data.id}/dashboard`);
    } catch (error: any) {
      console.error("Erro ao autenticar:", error);
      toast.error(error?.message || "Erro ao fazer login. Tente novamente.");
    }
  }

  return <SignInComponent submit={handleSignIn} isLoading={isLoading} />;
}
