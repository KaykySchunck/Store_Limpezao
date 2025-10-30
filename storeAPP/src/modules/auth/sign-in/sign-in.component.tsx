import { useFormStorage } from "@/modules/form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Controller } from "react-hook-form";
import { merchantSignInPayload } from "@/@types/sign-in";

type InProps = {
  submit: (data: Partial<merchantSignInPayload>) => void;
};

export function SignInComponent(Props: InProps) {
  const { submit } = Props;

  const { handleSubmit, control } = useFormStorage<merchantSignInPayload>({
    instance: "sign-in",
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: "O e-mail é obrigatório.",
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Digite um e-mail válido.",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            id="email"
            type="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: "A senha é obrigatória.",
          minLength: {
            value: 6,
            message: "A senha deve ter no mínimo 6 caracteres.",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            id="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
          />
        )}
      />

      <Button type="submit" variant="default">
        Entrar
      </Button>
    </form>
  );
}
