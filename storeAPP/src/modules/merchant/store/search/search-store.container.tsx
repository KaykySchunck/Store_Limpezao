import { useState } from "react";
import SearchStoreComponent from "./search-store.component";
import { useStoreContext } from "@/modules/contexts/store-context/store-context";
import { useGetStoreByName } from "@/hooks/store/useGetStoreByName";

export default function SearchStoreContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchStore, store: storesFiltred } = useGetStoreByName();
  const { store } = useStoreContext();
  const merchantId = store?.merchantId ?? "";

  async function handleSearch() {
    if (!searchTerm.trim()) {
      console.error("O campo de pesquisa está vazio.");
      return;
    }

    try {
      await fetchStore(merchantId, searchTerm);
      console.log("searchTerm:", searchTerm);
      console.log("Item encontrado:", storesFiltred);
    } catch (err) {
      console.error("Erro ao buscar item:", err);
    }
  }

  return (
    <SearchStoreComponent
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSearch={handleSearch}
    />
  );
}
