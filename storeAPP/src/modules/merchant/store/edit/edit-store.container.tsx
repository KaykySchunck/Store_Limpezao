import CreateStoreComponent from "./edit-store.component";
import { Store } from "@/@types/store";
import { useGetStoreById } from "@/hooks/store/useGetStoreById";
import { useUpdateStore } from "@/hooks/store/useUpdateStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

type InProps = {
  storeId: string;
  onClose: () => void;
};

export default function EditStoreContainer(props: InProps) {
  const { storeId, onClose } = props;

  const { store } = useGetStoreById(storeId);
  const { updateStore } = useUpdateStore();
  const router = useRouter();

  if (!store) {
    return <div>loading...</div>;
  }

  async function submit(data: Store) {
    try {
      const storeData: Store = {
        name: data.name,
        url: data.url,
        whatsApp: data.whatsApp,
        merchantId: data.merchantId,
      };

      const { success, error } = await updateStore(storeId, storeData);

      if (success) {
        sessionStorage.removeItem("@store:edit-store-form");
        toast.success("Loja editada com sucesso!");
        onClose();
        window.location.reload();
      } else {
        sessionStorage.removeItem("@store:edit-store-form");
        toast.error("Erro ao editar loja!");
        console.error("Erro ao editar Loja:", error);
      }
    } catch (error) {
      toast.error("Erro inesperado!");
      console.error("Erro inesperado:", error);
    }
  }

  return (
    <CreateStoreComponent submit={submit} store={store} onClose={onClose} />
  );
}
