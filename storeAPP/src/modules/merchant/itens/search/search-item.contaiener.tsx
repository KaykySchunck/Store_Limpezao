import { useState } from "react";
import SearchItemComponent from "./search-item.component";
import { useStoreContext } from "@/modules/contexts/store-context/store-context";
import { useGetItemByName } from "@/hooks/itens/useGetItemByName";
import { Item } from "@/@types/itens";

type Props = {
  setItens: (newItens: Item[]) => void;
};

export default function SearchItemContainer(inProps: Props) {
  const { setItens } = inProps;
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchItem, item } = useGetItemByName();
  const { store } = useStoreContext();
  const storeId = store?.id ?? "";

  async function handleSearch() {
    if (!searchTerm.trim()) {
      console.error("O campo de pesquisa está vazio.");
      return;
    }

    try {
      await fetchItem(storeId, searchTerm);
      console.log("Item encontrado:", item);
      setItens(item);
    } catch (err) {
      console.error("Erro ao buscar item:", err);
    }
  }

  return (
    <SearchItemComponent
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSearch={handleSearch}
    />
  );
}
