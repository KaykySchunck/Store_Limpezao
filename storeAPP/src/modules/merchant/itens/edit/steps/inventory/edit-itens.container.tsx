import { CreateItensPayload } from "@/@types/itens";
import { useRouter } from "next/navigation";
import { useStoreContext } from "@/modules/contexts/store-context/store-context";
import { useCreateItem } from "@/hooks/itens/useCreateItem";
import toast from "react-hot-toast";
import { EditItemInventoryComponent } from "./edit-itens.component";
import { useGetItemById } from "@/hooks/itens/useGetItemById";
import { useUpdateItem } from "@/hooks/itens/useUpdateItem";

type inProps = {
  itemId: string;
  handleCloseModals: () => void;
};

export default function EditItemInventoryContainer(Props: inProps) {
  const { itemId, handleCloseModals } = Props;
  const { item } = useGetItemById(itemId);
  const { store } = useStoreContext();
  const { updateItem } = useUpdateItem();

  if (!item) {
    return <div>Loading...</div>;
  }

  async function handleSubmit(data: CreateItensPayload) {
    try {
      if (!store?.id) {
        toast.error("Nenhuma loja selecionada.");
        return;
      }

      const {
        success,
        data: updatedItem,
        message,
        error,
      } = await updateItem(itemId, data);

      if (success) {
        console.log("Item editado com sucesso:", updatedItem);
        toast.success(message);
        sessionStorage.removeItem("@store:itens-edit-form");
        handleCloseModals();
      } else {
        console.error("Erro ao editar item:", error);
        toast.error(message);
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro inesperado!");
    }
  }

  return <EditItemInventoryComponent submit={handleSubmit} item={item} />;
}
