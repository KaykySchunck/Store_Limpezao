import { useFormStorage } from "@/modules/form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Controller } from "react-hook-form";
import { CreateCategoryPayload } from "@/@types/category";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { URL_CATEGORIES, URL_MERCHANT } from "@/constants/urls";

type InProps = {
  submit: (data: Partial<CreateCategoryPayload>) => void;
  handleClose: () => void;
};

export function CreateCategoriesComponent(Props: InProps) {
  const { submit, handleClose } = Props;

  const { handleSubmit, control } = useFormStorage<CreateCategoryPayload>({
    instance: "categories-form",
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-md bg-white border border-gray-200 shadow-lg">
          <DialogTitle>Cadastrar</DialogTitle>
          <div>
            <p className="text-muted-foreground text-sm mt-1 mb-2">
              Adicione seu item na sua loja registrando todas as informações a
              baixo
            </p>
            <form onSubmit={handleSubmit(submit)} className="mt-2">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "O nome da categoria é obrigatório.",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="category"
                    type="text"
                    label="Nome da categoria"
                    placeholder="Digite o nome da categoria"
                  />
                )}
              />

              <Button type="submit" variant="default">
                Cadastrar Categoria
              </Button>
            </form>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
