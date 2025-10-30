import { useState } from "react";
import ItensPageComponent from "./itens-page.component";
import CreateItemContainer from "../create/create-item.container";
import { useStoreContext } from "@/modules/contexts/store-context/store-context";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { useGetItens } from "@/hooks/itens/useGetItens";
import AddImagesItemContainer from "../AddImagesItem/AddImagesItem.container";

export default function ItensPageContainer() {
  const { store } = useStoreContext();
  const storeId = store?.id ?? "";
  const { categories } = useGetCategories(storeId);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalAddImages, setIsModalAddImages] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null); // Novo estado para o ID do item selecionado
  const { itens, reloadItens, setItens } = useGetItens(storeId);

  return (
    <>
      <ItensPageComponent
        itens={itens}
        reloadItens={reloadItens}
        setIsModalOpenCreate={setIsModalOpenCreate}
        setIsModalAddImages={setIsModalAddImages}
        setItens={setItens}
        setSelectedItemId={setSelectedItemId} // Passando a função para definir o ID do item selecionado
      />
      {isModalOpenCreate && (
        <CreateItemContainer
          setIsModalOpenCreate={setIsModalOpenCreate}
          categories={categories}
          reloadItens={reloadItens}
        />
      )}
      {isModalAddImages && (
        <AddImagesItemContainer
          isModalAddImages={setIsModalAddImages}
          selectedItemId={selectedItemId} // Passando o ID do item selecionado para o AddImagesItemContainer
        />
      )}
    </>
  );
}
