import { ColorInput } from "@/components/ui/input-color";
import { X } from "@phosphor-icons/react";

interface CatalogCustomizationModalProps {
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  onClose: () => void;
  setCatalogInfo: any;
}

export default function CatalogCustomizationModalComponent({
  backgroundColor,
  setBackgroundColor,
  onClose,
  setCatalogInfo,
}: CatalogCustomizationModalProps) {
  return (
    <div
      style={{ width: "22rem", padding: "1rem" }}
      className="absolute top-full mt-2 p-4 bg-white rounded-lg shadow-md border border-gray-300"
    >
      <div style={{ justifyContent: "end" }} className="flex items-center mb-4">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>
      <div>
        <ColorInput
          value={backgroundColor}
          onChange={(newColor) => {
            setBackgroundColor(newColor);
            setCatalogInfo((prev: any) => ({
              ...prev,
              backgroundCatalog: newColor,
            }));
          }}
          label="Cor de fundo"
          loading={false}
        />

        <p className="text-sm text-gray-500 text-center mt-4">
          Clique nos quadrados acima para selecionar uma cor. As cores
          escolhidas serão aplicadas ao fundo e ao nome da loja.
        </p>
      </div>
    </div>
  );
}
