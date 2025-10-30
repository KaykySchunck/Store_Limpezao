import { useState } from "react";
import { ItensActionsComponent } from "./table-actions.component";
import EditItemDetailContainer from "../../edit/steps/detail/edit-itens.container";
import { useStoreContext } from "@/modules/contexts/store-context/store-context";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import EditItemContainer from "../../edit/edit-item.container";
import DeleteItensComponent from "../../delete/delete-itens.component";
import DeleteItensContainer from "../../delete/delete-itens.container";

type ItensActionsContainerProps = {
  itemId: string;
  reloadItens: () => void;
};

export function ItensActionsContainer({
  itemId,
  reloadItens,
}: ItensActionsContainerProps) {
  const { store } = useStoreContext();
  const storeId = store?.id ?? "";
  const { categories } = useGetCategories(storeId);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  function handleToggleModalEdit(isOpen: boolean, itemId?: string) {
    setSelectedItemId(itemId || null);
    setIsModalOpenEdit(isOpen);
  }

  function handleToggleModalDelete(isOpen: boolean, itemId?: string) {
    setSelectedItemId(itemId || null);
    setIsModalOpenDelete(isOpen);
  }

  function handleCloseModals() {
    setIsModalOpenEdit(false);
    setIsModalOpenDelete(false);
    sessionStorage.removeItem("@store:itens-edit-form");

    reloadItens();
  }

  return (
    <>
      <ItensActionsComponent
        itemId={itemId}
        onEdit={handleToggleModalEdit}
        onDelete={handleToggleModalDelete}
      />
      {isModalOpenEdit && (
        <EditItemContainer
          handleCloseModals={handleCloseModals}
          categories={categories}
          itemId={selectedItemId || ""}
        />
      )}
      {isModalOpenDelete && (
        <DeleteItensContainer
          handleCloseModals={handleCloseModals}
          itemId={selectedItemId || ""}
        />
      )}
    </>
  );
}
