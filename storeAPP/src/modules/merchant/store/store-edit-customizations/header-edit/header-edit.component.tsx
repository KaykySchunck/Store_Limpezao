import { ShoppingCart } from "lucide-react";
import HeaderCustomizationModalContainer from "../modal/header-customization-modal/header-customization-modal.container";

type HeaderEditComponentProps = {
  backgroundColor: string;
  colorText: string;
  titleText: string;
  showModal: boolean;
  toggleMenu: () => void;
  setBackgroundColor: (color: string) => void;
  setColorText: (color: string) => void;
  setTitleText: (text: string) => void;
};

export default function HeaderEditComponent({
  backgroundColor,
  colorText,
  titleText,
  showModal,
  toggleMenu,
  setBackgroundColor,
  setColorText,
  setTitleText,
}: HeaderEditComponentProps) {
  const headerConfig = {
    backgroundColor,
    textColor: colorText,
    storeName: titleText,
  };

  const setHeaderConfig = (newConfig: {
    backgroundColor: string;
    textColor: string;
    storeName: string;
  }) => {
    setBackgroundColor(newConfig.backgroundColor);
    setColorText(newConfig.textColor);
    setTitleText(newConfig.storeName);
  };

  return (
    <div className="relative z-10">
      <div
        onClick={toggleMenu}
        style={{ backgroundColor: backgroundColor }}
        className="shadow-lg w-full cursor-pointer py-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between rounded-t-lg"
      >
        <h1
          style={{ color: colorText }}
          className="text-3xl font-semibold drop-shadow-lg w-full sm:w-auto overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {titleText}
        </h1>
        <ShoppingCart style={{ color: colorText }} size={30} />
      </div>

      {showModal && (
        <HeaderCustomizationModalContainer
          headerConfig={headerConfig}
          setHeaderConfig={setHeaderConfig}
        />
      )}
    </div>
  );
}
