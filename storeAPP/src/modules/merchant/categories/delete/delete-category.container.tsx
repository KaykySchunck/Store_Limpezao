"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";
import toast from "react-hot-toast";
import DeleteCategoryComponent from "./delete-itens.component";

interface Props {
  categoryId: string;
  closeModals: () => void;
  reloadCategories: () => void;
}

export default function DeleteCategoryContainer(inProps: Props) {
  const { categoryId, closeModals, reloadCategories } = inProps;

  const { deleteCategory } = useDeleteCategory();

  function handleDeleteCategory() {
    deleteCategory(categoryId as string);
    toast.success("Categoria deletada com sucesso!");
    reloadCategories();
    closeModals();
  }

  if (!categoryId) {
    return <p>Carregando...</p>;
  }

  return (
    <DeleteCategoryComponent
      handleDeleteCategory={handleDeleteCategory}
      closeModals={closeModals}
    />
  );
}
