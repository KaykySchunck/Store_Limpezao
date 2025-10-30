import { configEditType } from "@/@types/config";
import { Controller } from "react-hook-form";
import { Button, Input } from "@/components/ui";
import { useFormStorage } from "@/modules/form";

type InProps = {
  configEdit: (data: Partial<configEditType>) => void;
};

export default function ConfigFormComponent(Props: InProps) {
  const { configEdit } = Props;

  const { handleSubmit, control } = useFormStorage<configEditType>({
    instance: "config-form",
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return (
    <form
      onSubmit={handleSubmit(configEdit)}
      className="h-full flex flex-col mt-2 justify-between"
    >
      <div className="flex flex-wrap gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="Seu nome"
              placeholder="Digite seu nome"
            />
          )}
        />

        <Controller
          name="NameStore"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="Nome Da Loja"
              placeholder="Digite o nome Da Loja"
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="Telefone/WhatsApp"
              placeholder="Digite seu WhatsApp"
            />
          )}
        />
      </div>

      <Button type="submit" variant="default" className="self-end">
        salvar
      </Button>
    </form>
  );
}
