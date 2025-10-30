import { useGetStoreByMerchantId } from "@/hooks/store/useGetStoreByMerchantId";
import ListStoresComponent from "./list-stores.component";
import { useState } from "react";
import EditStoreContainer from "../edit/edit-store.container";
import { useStoreContext } from "@/modules/contexts/store-context/store-context";
import CreateStoreContainer from "../create/create-store..container";

type Props = {
  merchantId: string;
};

export default function ListStoresContainer({ merchantId }: Props) {
  const { stores, error, isLoading } = useGetStoreByMerchantId(merchantId);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);

  function handleEditStore(storeId: string) {
    setSelectedStoreId(storeId);
    setIsModalOpenEdit(true);
  }

  function onClose() {
    sessionStorage.removeItem("@store:edit-store-form");
    setIsModalOpenEdit(false);
  }

  if (isLoading) {
    return (
      <div className="text-center text-gray-700 p-4">
        <p className="text-lg font-semibold">Carregando lojas...</p>
      </div>
    );
  }

  if (!stores || stores.length === 0) {
    return (
      <div className="text-center text-gray-700 p-4">
        <p className="text-lg font-semibold">Nenhuma loja cadastrada ainda</p>
        <p className="text-sm mt-2">
          Você ainda não possui lojas cadastradas. Adicione sua primeira loja
          para começar a gerenciar seus produtos e atender seus clientes!
        </p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setIsModalOpenCreate(true)}
        >
          Criar minha primeira loja
        </button>
        {isModalOpenCreate && (
          <CreateStoreContainer
            merchantId={merchantId}
            setIsModalOpenCreate={setIsModalOpenCreate}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <ListStoresComponent
        stores={stores}
        merchantId={merchantId}
        onEditStore={handleEditStore}
      />
      {isModalOpenEdit && selectedStoreId && (
        <EditStoreContainer storeId={selectedStoreId} onClose={onClose} />
      )}
    </>
  );
}
