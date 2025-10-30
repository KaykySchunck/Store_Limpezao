import { useFormStorage } from "@/modules/form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Controller } from "react-hook-form";
import { Category, CreateCategoryPayload } from "@/@types/category";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

type InProps = {
  submit: (data: Partial<CreateCategoryPayload>) => void;
  category: Category;
  closeModals: () => void;
};

export function EditCategoriesComponent(Props: InProps) {
  const { submit, category, closeModals } = Props;

  const { handleSubmit, control } = useFormStorage<CreateCategoryPayload>({
    instance: "categories-form-edit",
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: category?.name || "",
      fk_idstore: category?.fk_idstore || "",
    },
  });

  return (
    <Dialog open onOpenChange={closeModals}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-md bg-white border border-gray-200 shadow-lg">
          <DialogTitle>Editar</DialogTitle>
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
                  value={field.value || ""}
                />
              )}
            />

            <Button type="submit" variant="default">
              Editar Categoria
            </Button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
