import { useFormStorage } from "@/modules/form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Controller } from "react-hook-form";
import { CreateItensPayload } from "@/@types/itens";

type InProps = {
  submit: (data: CreateItensPayload) => void;
  item: CreateItensPayload;
};

export function EditItemInventoryComponent(Props: InProps) {
  const { submit, item } = Props;

  const { handleSubmit, control } = useFormStorage<CreateItensPayload>({
    instance: "itens-edit-form",
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      value: item.value,
      stock: item.stock,
    },
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        name="value"
        control={control}
        rules={{
          required: "O valor do produto é obrigatório.",
        }}
        render={({ field }) => (
          <Input
            {...field}
            id="value"
            type="number"
            label="Valor do Produto"
            placeholder="Digite o valor do produto"
          />
        )}
      />

      <Controller
        name="stock"
        control={control}
        rules={{
          required: "o estoque do produto é obrigatório.",
        }}
        render={({ field }) => (
          <Input
            {...field}
            id="stock"
            type="number"
            label="Estoque"
            placeholder="Digite a quantidade de estoque do produto"
          />
        )}
      />

      <Button type="submit" variant="default">
        Cadastrar Produto
      </Button>
    </form>
  );
}
