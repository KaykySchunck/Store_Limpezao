import { useState } from "react";
import EditItemComponent from "./edit-item.component";
import { Category } from "@/@types/category";
import EditItemDetailContainer from "./steps/detail/edit-itens.container";
import EditItemInventoryContainer from "./steps/inventory/edit-itens.container";

type InProps = {
  handleCloseModals: () => void;
  categories: Category[];
  itemId: string;
};

export default function EditItemContainer({
  handleCloseModals,
  categories,
  itemId,
}: InProps) {
  const [currentStep, setCurrentStep] = useState<string>("detail");

  const renderStep = () => {
    switch (currentStep) {
      case "detail":
        return (
          <EditItemDetailContainer
            categories={categories}
            setCurrentStep={setCurrentStep}
            itemId={itemId}
          />
        );
      case "inventory":
        return (
          <EditItemInventoryContainer
            itemId={itemId}
            handleCloseModals={handleCloseModals}
          />
        );
      default:
        return null;
    }
  };

  return (
    <EditItemComponent handleCloseModals={handleCloseModals}>
      {renderStep()}
    </EditItemComponent>
  );
}
