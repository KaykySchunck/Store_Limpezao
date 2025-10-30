"use client";

import { Store } from "@/@types/store";
import { Category } from "@/@types/category";
import EditCategoriesContainer from "../edit/edit-categories.container";
import DeleteCategoryContainer from "../delete/delete-category.container";
import { useState } from "react";
import { useStoreContext } from "@/modules/contexts/store-context/store-context";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { CategoriesItemComponent } from "./categories-itens.component";

type Props = {
  categories: Category[];
  store?: Store;
  reloadCategories: () => void;
};

export function CategoriesItensContainer({
  categories,
  store,
  reloadCategories,
}: Props) {
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  function handleToggleModalEditCategorie(
    isOpen: boolean,
    categoryId?: string
  ) {
    setSelectedCategoryId(categoryId || null);
    setIsModalOpenEdit(isOpen);
  }

  function handleToggleModalDeleteCategorie(
    isOpen: boolean,
    categoryId?: string
  ) {
    setSelectedCategoryId(categoryId || null);
    setIsModalOpenDelete(isOpen);
  }

  function handleCloseModals() {
    setIsModalOpenEdit(false);
    setIsModalOpenDelete(false);
    sessionStorage.removeItem("@store:categories-form-edit");
  }

  return store ? (
    <>
      <CategoriesItemComponent
        categories={categories}
        store={store as Store}
        ToggleModalEdit={(isOpen, categoryId) =>
          handleToggleModalEditCategorie(isOpen, categoryId)
        }
        ToggleModalDelete={(isOpen, categoryId) =>
          handleToggleModalDeleteCategorie(isOpen, categoryId)
        }
      />
      {isModalOpenEdit && selectedCategoryId && (
        <EditCategoriesContainer
          store={store}
          categoryId={selectedCategoryId}
          closeModals={handleCloseModals}
          reloadCategories={reloadCategories}
        />
      )}
      {isModalOpenDelete && selectedCategoryId && (
        <DeleteCategoryContainer
          categoryId={selectedCategoryId}
          closeModals={handleCloseModals}
          reloadCategories={reloadCategories}
        />
      )}
    </>
  ) : null;
}
