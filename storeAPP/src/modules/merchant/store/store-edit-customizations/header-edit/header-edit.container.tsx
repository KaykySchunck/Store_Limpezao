"use client";

import { useState, useEffect } from "react";
import HeaderEditComponent from "./header-edit.component";
import { storeCustomizationsDivided } from "@/@types/store";

type Props = {
  initialCustomizationsHeader: storeCustomizationsDivided["header"];
};

export default function HeaderEditContainer({
  initialCustomizationsHeader,
}: Props) {
  const [backgroundColor, setBackgroundColor] = useState(
    initialCustomizationsHeader.backgroundColor || "#fff"
  );
  const [colorText, setColorText] = useState(
    initialCustomizationsHeader.colorTextTitleHeader || "#000"
  );
  const [titleText, setTitleText] = useState(
    initialCustomizationsHeader.titleText || "Titulo"
  );
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setBackgroundColor((prevState) =>
      prevState === initialCustomizationsHeader.backgroundColor
        ? prevState
        : initialCustomizationsHeader.backgroundColor || "#fff"
    );
    setColorText((prevState) =>
      prevState === initialCustomizationsHeader.colorText
        ? prevState
        : initialCustomizationsHeader.colorText || "#000"
    );
    setTitleText((prevState) =>
      prevState === initialCustomizationsHeader.titleText
        ? prevState
        : initialCustomizationsHeader.titleText || "Titulo"
    );
  }, [initialCustomizationsHeader]);

  return (
    <HeaderEditComponent
      backgroundColor={backgroundColor}
      colorText={colorText}
      titleText={titleText}
      showModal={showModal}
      toggleMenu={toggleMenu}
      setBackgroundColor={setBackgroundColor}
      setColorText={setColorText}
      setTitleText={setTitleText}
    />
  );
}
