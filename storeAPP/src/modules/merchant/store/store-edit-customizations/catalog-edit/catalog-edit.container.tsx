import { useState, useEffect } from "react";
import CatalogEditComponent from "./catalog-edit.component";
import { storeCustomizationsDivided } from "@/@types/store";

type Props = {
  initialCustomizationsCatalog: storeCustomizationsDivided["catalog"];
};

export default function CatalogEditContainer({
  initialCustomizationsCatalog,
}: Props) {
  const [backgroundColor, setBackgroundColor] = useState<string>(
    initialCustomizationsCatalog.backgroundColor || "#fff"
  );
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setBackgroundColor((prevState) => {
      return prevState === initialCustomizationsCatalog.backgroundColor
        ? prevState
        : initialCustomizationsCatalog.backgroundColor || "#fff";
    });
  }, [initialCustomizationsCatalog]);

  return (
    <CatalogEditComponent
      backgroundColor={backgroundColor}
      setBackgroundColor={setBackgroundColor}
      showModal={showModal}
      toggleMenu={toggleMenu}
    />
  );
}
