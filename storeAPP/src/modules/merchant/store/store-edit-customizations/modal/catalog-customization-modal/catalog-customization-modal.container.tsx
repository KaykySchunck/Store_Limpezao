import { useStoreEditContext } from "../../../../../contexts/store-context/store-edit-context";
import CatalogCustomizationModalComponent from "./catalog-customization-modal.component";

interface CatalogCustomizationModalProps {
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  onClose: () => void;
}

export default function CatalogCustomizationModalContainer({
  backgroundColor,
  setBackgroundColor,
  onClose,
}: CatalogCustomizationModalProps) {
  const { setCatalogInfo } = useStoreEditContext();

  return (
    <CatalogCustomizationModalComponent
      backgroundColor={backgroundColor}
      setBackgroundColor={setBackgroundColor}
      onClose={onClose}
      setCatalogInfo={setCatalogInfo}
    />
  );
}
