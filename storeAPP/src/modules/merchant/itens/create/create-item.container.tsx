import { useState } from "react";
import CreateItemComponent from "./create-item.component";
import CreateItensInventoryContainer from "./steps/inventory/create-itens.container";
import { Category } from "@/@types/category";
import CreateItensDetailContainer from "./steps/detail/create-itens.container";

type InProps = {
  setIsModalOpenCreate: any;
  categories: Category[];
  reloadItens: () => void;
};

export default function CreateItemContainer({
  setIsModalOpenCreate,
  categories,
  reloadItens,
}: InProps) {
  const [currentStep, setCurrentStep] = useState<string>("detail");

  const renderStep = () => {
    switch (currentStep) {
      case "detail":
        return (
          <CreateItensDetailContainer
            categories={categories}
            setCurrentStep={setCurrentStep}
          />
        );
      case "inventory":
        return (
          <CreateItensInventoryContainer
            setIsModalOpenCreate={setIsModalOpenCreate}
            reloadItens={reloadItens}
          />
        );
      default:
        return null;
    }
  };

  return (
    <CreateItemComponent setIsModalOpenCreate={setIsModalOpenCreate}>
      {renderStep()}
    </CreateItemComponent>
  );
}
