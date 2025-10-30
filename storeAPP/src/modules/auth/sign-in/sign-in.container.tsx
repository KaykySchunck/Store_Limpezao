import { merchantSignInPayload } from "@/@types/sign-in";
import { SignInComponent } from "./sign-in.component";
import { useAuthEmail } from "@/hooks/auth/merchant/useAuthEmail";
import { useRouter } from "next/navigation";

export function SignInContainer() {
  const { authMerchantEmail } = useAuthEmail();
  const router = useRouter();

  async function handleSignIn(payload: Partial<merchantSignInPayload>) {
    try {
      if (!payload.email) {
        console.error("O email é obrigatório.");
        return;
      }

      const res = await authMerchantEmail(payload as merchantSignInPayload);

      if (!res.data) {
        console.error("Falha na autenticação.");
        return;
      }

      localStorage.setItem("store@token", res.data.token);
      router.push(`/merchant/${res.data.id}/dashboard`);
    } catch (error) {
      console.error("Erro ao autenticar:", error);
    }
  }

  return <SignInComponent submit={handleSignIn} />;
}
