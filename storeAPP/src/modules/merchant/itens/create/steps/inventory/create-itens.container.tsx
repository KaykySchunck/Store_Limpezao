import { CreateItensPayload } from "@/@types/itens";
import { useRouter } from "next/navigation";
import { URL_ITENS, URL_MERCHANT } from "@/constants/urls";
import { useStoreContext } from "@/modules/contexts/store-context/store-context";
import { useCreateItem } from "@/hooks/itens/useCreateItem";
import toast from "react-hot-toast";
import { CreateItensInventoryComponent } from "./create-itens.component";

type Props = {
  setIsModalOpenCreate: (boolean: Boolean) => void;
  reloadItens: () => void;
};

export default function CreateItensInventoryContainer(inProps: Props) {
  const { setIsModalOpenCreate, reloadItens } = inProps;
  const { store } = useStoreContext();
  const { createItem } = useCreateItem();

  async function handleSubmit(data: CreateItensPayload) {
    try {
      if (!store?.id) {
        toast.error("Nenhuma loja selecionada.");
        return;
      }

      data.fk_idstore = store?.id;
      const { success, result, error } = await createItem(data);
      if (success) {
        console.log("Item criado com sucesso:", result.categorie);
        toast.success("Item criada com sucesso!");
        sessionStorage.removeItem("@store:itens-create-form");
        reloadItens();
        setIsModalOpenCreate(false);
      } else {
        console.error("Erro ao criar item:", error);
        toast.error("Erro ao criar item!");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro inesperado!");
    }
  }

  return <CreateItensInventoryComponent submit={handleSubmit} />;
}
