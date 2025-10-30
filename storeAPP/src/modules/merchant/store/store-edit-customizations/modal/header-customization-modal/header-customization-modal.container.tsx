import { useState } from "react";
import { useStoreEditContext } from "../../../../../contexts/store-context/store-edit-context";
import HeaderCustomizationModalComponent from "./header-customization-modal.component";

interface HeaderConfig {
  backgroundColor: string;
  textColor: string;
  storeName: string;
}

interface HeaderCustomizationModalProps {
  headerConfig: HeaderConfig;
  setHeaderConfig: (config: HeaderConfig) => void;
}

export default function HeaderCustomizationModalContainer({
  headerConfig,
  setHeaderConfig,
}: HeaderCustomizationModalProps) {
  const [showModal, setShowModal] = useState(true);
  const { setHeaderInfo } = useStoreEditContext();

  function handleClose() {
    setShowModal(false);
  }

  function updateHeaderConfig(key: keyof HeaderConfig, value: string) {
    console.log(headerConfig);
    const updatedConfig = { ...headerConfig, [key]: value };
    setHeaderConfig(updatedConfig);
    console.log(updatedConfig);
    setHeaderInfo((prev) => ({ ...prev, [key]: value }));
  }

  if (!showModal) return null;

  return (
    <HeaderCustomizationModalComponent
      headerConfig={headerConfig}
      updateHeaderConfig={updateHeaderConfig}
      handleClose={handleClose}
    />
  );
}
