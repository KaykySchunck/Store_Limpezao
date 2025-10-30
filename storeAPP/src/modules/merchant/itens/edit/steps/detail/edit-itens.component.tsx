import { useFormStorage } from "@/modules/form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Controller } from "react-hook-form";
import { Autocomplete } from "@/components/ui/autocomplete";
import { CreateItensPayload } from "@/@types/itens";
import { Category } from "@/@types/category";
import { Item } from "@radix-ui/react-dropdown-menu";

type InProps = {
  categories: Category[];
  item: CreateItensPayload;
  setCurrentStep: (step: string) => void;
};

export function EditItemDetailComponent(Props: InProps) {
  const { categories, item, setCurrentStep } = Props;

  const { handleSubmit, control, setValue } =
    useFormStorage<CreateItensPayload>({
      instance: "itens-edit-form",
      mode: "onSubmit",
      reValidateMode: "onChange",
      defaultValues: {
        name: item.name,
        fk_idcategory: item.fk_idcategory,
        description: item.description,
      },
    });
  console.log(item);

  return (
    <div>
      <p className="text-muted-foreground text-sm mt-1 mb-2">
        Edite seu item da sua loja registrando todas as informações a baixo
      </p>
      <form>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "O nome do produto é obrigatório.",
            minLength: {
              value: 3,
              message: "O nome do produto deve ter no mínimo 3 caracteres.",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Input
                {...field}
                id="name"
                type="text"
                label="Nome do Produto"
                placeholder="Digite o nome do produto"
                value={field.value}
              />
              {error && <span className="text-red-500">{error.message}</span>}
            </div>
          )}
        />

        <Controller
          name="fk_idcategory"
          control={control}
          rules={{
            required: "A categoria é obrigatória.",
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Autocomplete
                {...field}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.name,
                  id: category.id,
                }))}
                label="Categoria"
                placeholder="Selecione uma categoria"
                value={
                  categories.find((category) => category.name === field.value)
                    ?.name || ""
                }
                onValueChange={(newValue) => {
                  const selectedCategory = categories.find(
                    (category) => category.name === newValue
                  );

                  const categoryId = selectedCategory
                    ? selectedCategory.id
                    : null;

                  setValue("fk_idcategory", categoryId!);
                  field.onChange(newValue);
                }}
              />
              {error && <span className="text-red-500">{error.message}</span>}
            </div>
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{
            required: "A descrição do produto é obrigatória.",
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Input
                {...field}
                id="description"
                type="text"
                label="Descrição"
                placeholder="Digite a descrição do produto"
                value={field.value}
              />
              {error && <span className="text-red-500">{error.message}</span>}
            </div>
          )}
        />

        <Button onClick={() => setCurrentStep("inventory")} variant="default">
          Continuar
        </Button>
      </form>
    </div>
  );
}
