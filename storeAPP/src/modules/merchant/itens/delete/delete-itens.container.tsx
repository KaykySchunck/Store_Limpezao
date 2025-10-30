"use client";

import React from "react";
import DeleteItensComponent from "./delete-itens.component";
import { useDeleteItem } from "@/hooks/itens/useDeleteItem";
import toast from "react-hot-toast";

type InProps = {
  handleCloseModals: () => void;
  itemId: string;
};

export default function DeleteItensContainer({
  handleCloseModals,
  itemId,
}: InProps) {
  const { deleteItem } = useDeleteItem();

  async function handleDeleteItem() {
    try {
      await deleteItem(itemId);
      toast.success("Item deletado com sucesso");
      handleCloseModals();
    } catch (error) {
      toast.error("Erro ao deletar item");
    }
  }

  if (!itemId) {
    return <p>Carregando...</p>;
  }

  return (
    <DeleteItensComponent
      handleDeleteItem={handleDeleteItem}
      handleCloseModals={handleCloseModals}
    />
  );
}
