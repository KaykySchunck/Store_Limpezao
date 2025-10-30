import { Category, CreateCategoryPayload } from "@/@types/category";
import { CreateCategoriesComponent } from "./create-categories.component";
import { useCreateCategory } from "@/hooks/categories/useCreateCategory";
import toast from "react-hot-toast";
import { useStoreContext } from "../../../contexts/store-context/store-context";

interface Props {
  onClose: () => void;
  reloadCategories: () => void;
}

export default function CreateCategoriesContainer(inProps: Props) {
  const { onClose, reloadCategories } = inProps;
  const { store } = useStoreContext();
  const { createCategory } = useCreateCategory();

  async function handleSubmit(data: Partial<Category>) {
    try {
      if (!store?.id) {
        toast.error("Nenhuma loja selecionada.");
        return;
      }

      const payload: CreateCategoryPayload = {
        name: data.name!,
        fk_idstore: store?.id as string,
      };

      const { success, result, error } = await createCategory(payload);

      if (success) {
        console.log("Categoria criada com sucesso:", result.categorie);
        toast.success("Categoria criada com sucesso!");
        sessionStorage.removeItem("@store:categories-form");
        reloadCategories();
        handleClose();
      } else {
        console.error("Erro ao crcd iar categoria:", error);
        toast.error("Erro ao criar categoria!");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro inesperado!");
    }
  }

  function handleClose() {
    onClose();
  }

  return (
    <CreateCategoriesComponent
      submit={handleSubmit}
      handleClose={handleClose}
    />
  );
}
