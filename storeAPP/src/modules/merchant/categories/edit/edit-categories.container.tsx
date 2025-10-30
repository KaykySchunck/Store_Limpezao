import { Category } from "@/@types/category";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStoreContext } from "../../../contexts/store-context/store-context";
import { EditCategoriesComponent } from "./edit-categories.component";
import { useGetCategoryById } from "@/hooks/categories/useGetCategoryById";
import { useUpdateCategory } from "@/hooks/categories/useUpdateCategory";
import { Store } from "@/@types/store";

interface Props {
  categoryId: string;
  store: Store;
  closeModals: () => void;
  reloadCategories: () => void;
}

export default function EditCategoriesContainer(inProps: Props) {
  const { categoryId, store, closeModals, reloadCategories } = inProps;
  const { category, loading, error } = useGetCategoryById(store.id as string, categoryId);
  const { updateCategory } = useUpdateCategory();

  // Mostra loading enquanto carrega a categoria
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Mostra erro se não conseguir carregar a categoria
  if (error) {
    console.error("Erro ao carregar categoria:", error);
    return <div>Erro ao carregar categoria</div>;
  }

  // Não renderiza se não há categoria
  if (!category) {
    return <div>Categoria não encontrada</div>;
  }

  async function handleSubmit(data: Partial<Category>) {
    try {
      if (!store?.id) {
        toast.error("Nenhuma loja selecionada.");
        return;
      }

      const { success, result, error } = await updateCategory(
        categoryId,
        data.name as string
      );

      if (success) {
        console.log("Categoria editada com sucesso:", result.categorie);
        toast.success("Categoria editada com sucesso!");
        sessionStorage.removeItem("@store:categories-form-edit");
        reloadCategories();
        closeModals();
      } else {
        console.error("Erro ao editar categoria:", error);
        toast.error("Erro ao editar categoria!");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro inesperado!");
    }
  }

  return (
    <EditCategoriesComponent
      submit={handleSubmit}
      category={category}
      closeModals={closeModals}
    />
  );
}
