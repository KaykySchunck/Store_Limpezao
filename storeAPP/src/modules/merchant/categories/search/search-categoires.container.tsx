import { useState } from "react";
import SearchCategoriesComponent from "./search-categories.component";
import { useGetCategoryByName } from "@/hooks/categories/useGetCategoryByName";

import { Store } from "@/@types/store";
import CreateCategoriesContainer from "../create/create-categories.container";

type Props = {
  setCategories: any;
  store?: Store | undefined;
  reloadCategories: any;
};

export default function SearchCategoriesContainer({
  reloadCategories,
  store,
  setCategories,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchCategory, category } = useGetCategoryByName();
  const storeId = store?.id ?? "";

  async function handleSearch() {
    if (!searchTerm) {
      console.error("O campo de pesquisa está vazio.");
      return;
    }
    await fetchCategory(storeId, searchTerm);
    console.log("Categoria encontrada:", category);
    setCategories(category);
  }

  function handleToggleModalCreateCategorie(isOpen: boolean) {
    setIsModalOpen(isOpen);
  }

  return (
    <>
      <SearchCategoriesComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        ToggleModalCreate={() => handleToggleModalCreateCategorie(true)}
      />
      {isModalOpen && (
        <CreateCategoriesContainer
          onClose={() => handleToggleModalCreateCategorie(false)}
          reloadCategories={reloadCategories}
        />
      )}
    </>
  );
}
