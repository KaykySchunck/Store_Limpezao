"use client";

import { useState, useEffect } from "react";
import NavbarEditComponent from "./navbar-edit.component";
import { storeCustomizationsDivided } from "@/@types/store";

type Props = {
  initialCustomizationsNavbar: storeCustomizationsDivided["navbar"];
};

export default function NavbarEditContainer({
  initialCustomizationsNavbar,
}: Props) {
  const [backgroundColor, setBackgroundColor] = useState(
    initialCustomizationsNavbar.backgroundColor || "#ffffff"
  );
  const [colorText, setColorText] = useState(
    initialCustomizationsNavbar.colorText || "#000000"
  );
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setBackgroundColor(
      initialCustomizationsNavbar.backgroundColor || "#ffffff"
    );
    setColorText(initialCustomizationsNavbar.colorText || "#000000");
  }, [initialCustomizationsNavbar]);

  return (
    <NavbarEditComponent
      backgroundColor={backgroundColor}
      colorText={colorText}
      showModal={showModal}
      toggleMenu={toggleMenu}
      setBackgroundColor={setBackgroundColor}
      setColorText={setColorText}
    />
  );
}
