import { Button } from "@/components/ui";
import { ColorInput } from "@/components/ui/input-color";
import { X } from "@phosphor-icons/react";
import { useStoreEditContext } from "../../../../../contexts/store-context/store-edit-context";

interface NavbarCustomizationModalProps {
  backgroundColor: string;
  categoriesColor: string;
  onClose: () => void;
  setNavbarInfo: (info: any) => void;
  onBackgroundColorChange: (color: string) => void;
  onCategoriesColorChange: (color: string) => void;
}

export default function NavbarCustomizationModal({
  backgroundColor,
  categoriesColor,
  onClose,
  setNavbarInfo,
  onBackgroundColorChange,
  onCategoriesColorChange,
}: NavbarCustomizationModalProps) {
  return (
    <div
      style={{ width: "22rem", padding: "1rem" }}
      className="absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-black"
    >
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      <ColorInput
        value={backgroundColor}
        onChange={(newColor) => {
          onBackgroundColorChange(newColor);
          setNavbarInfo((prev: any) => ({
            ...prev,
            backgroundColorNavbar: newColor,
          }));
        }}
        label="Escolha a cor de fundo"
        loading={false}
      />

      <ColorInput
        value={categoriesColor}
        onChange={(newColor) => {
          onCategoriesColorChange(newColor);
          setNavbarInfo((prev: any) => ({
            ...prev,
            colorTextNavbar: newColor,
          }));
        }}
        label="Escolha a cor das categorias"
        loading={false}
      />

      <p className="text-xs text-gray-400 mt-4 text-center">
        Clique nos quadrados acima para selecionar uma cor. As cores escolhidas
        serão aplicadas ao fundo e nas categorias.
      </p>
    </div>
  );
}
