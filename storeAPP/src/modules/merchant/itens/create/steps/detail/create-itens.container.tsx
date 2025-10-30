import { CreateItensDetailComponent } from "./create-itens.component";
import { useStoreContext } from "@/modules/contexts/store-context/store-context";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { useState } from "react";
import { Category } from "@/@types/category";

interface Props {
  setCurrentStep: (step: string) => void;
  categories: Category[];
}

export default function CreateItensDetailContainer(inProps: Props) {
  const { setCurrentStep, categories } = inProps;

  return (
    <CreateItensDetailComponent
      categories={categories}
      setCurrentStep={setCurrentStep}
    />
  );
}
