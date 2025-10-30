// Container
import { useState } from "react";
import { useStoreEditContext } from "../../../../../contexts/store-context/store-edit-context";
import NavbarCustomizationModalComponent from "./navbar-customization-modal.component";

interface NavbarCustomizationModalProps {
  backgroundColor: string;
  categoriesColor: string;
  setBackgroundColor: (color: string) => void;
  setCategoriesColor: (color: string) => void;
}

export default function NavbarCustomizationModalContainer({
  backgroundColor,
  categoriesColor,
  setBackgroundColor,
  setCategoriesColor,
}: NavbarCustomizationModalProps) {
  const [showModal, setShowModal] = useState(true);
  const { setNavbarInfo } = useStoreEditContext();

  function handleClose() {
    setShowModal(false);
  }

  if (!showModal) return null;

  return (
    <NavbarCustomizationModalComponent
      backgroundColor={backgroundColor}
      categoriesColor={categoriesColor}
      onClose={handleClose}
      setNavbarInfo={setNavbarInfo}
      onBackgroundColorChange={setBackgroundColor}
      onCategoriesColorChange={setCategoriesColor}
    />
  );
}
