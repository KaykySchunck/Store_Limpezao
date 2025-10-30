import toast from "react-hot-toast";
import CreateStoreComponent from "./create-store.component";
import { CreateStore } from "@/@types/store";
import { useCreateStore } from "@/hooks/store/useCreateStore";
import { useCreateStoreCustomizations } from "@/hooks/store-customizations/useCreateStoreCustomizations";

type inProps = {
  merchantId: string;
  setIsModalOpenCreate: (ssBoolean: boolean) => void;
};

export default function CreateStoreContainer(Props: inProps) {
  const { merchantId, setIsModalOpenCreate } = Props;
  const { createStore } = useCreateStore();
  const { handleCreateStoreCustomizations } = useCreateStoreCustomizations();

  async function handleStoreCustomizations(storeId: string) {
    try {
      const { success, result, error } = await handleCreateStoreCustomizations(
        storeId
      );
      if (success) {
        toast.success("Area de edição da Loja criada com sucesso!");
      } else {
        console.error("Erro ao criar Loja:", error);
      }
    } catch (error) {
      console.error("Erro ao configurar loja:", error);
      toast.error("Erro ao configurar loja!");
    }
  }

  async function handleSubmit(data: Partial<CreateStore>) {
    try {
      const storeData: CreateStore = {
        name: data.name,
        url: data.url,
        whatsApp: data.whatsApp,
        merchantId,
      };

      const { success, result, error } = await createStore(storeData);

      if (success) {
        console.log("Loja criada com sucesso:", result.store.id);
        await handleStoreCustomizations(result.store.id);
        sessionStorage.removeItem("@store:create-store-form");
        toast.success("Loja criada com sucesso!");
        setIsModalOpenCreate(false);
        window.location.reload();
      } else {
        sessionStorage.removeItem("@store:create-store-form");
        console.error("Erro ao criar Loja:", error);
        toast.error("Erro ao criar Loja!");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro inesperado!");
    }
  }

  return (
    <CreateStoreComponent
      submit={handleSubmit}
      setIsModalOpenCreate={setIsModalOpenCreate}
    />
  );
}
