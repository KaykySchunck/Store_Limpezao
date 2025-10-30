import { X } from "@phosphor-icons/react";
import { ColorInput } from "@/components/ui/input-color";

interface HeaderConfig {
  backgroundColor: string;
  textColor: string;
  storeName: string;
}

interface HeaderCustomizationModalComponentProps {
  headerConfig: {
    backgroundColor: string;
    textColor: string;
    storeName: string;
  };
  updateHeaderConfig: (key: keyof HeaderConfig, value: string) => void;
  handleClose: () => void;
}

export default function HeaderCustomizationModalComponent({
  headerConfig,
  updateHeaderConfig,
  handleClose,
}: HeaderCustomizationModalComponentProps) {
  return (
    <div
      style={{ width: "22rem", padding: "1rem" }}
      className="absolute top-full mt-2 bg-white rounded-lg shadow-md border border-gray-300"
    >
      <div style={{ justifyContent: "end" }} className="flex items-center mb-4">
        <button
          onClick={handleClose}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>
      <div className="space-y-3">
        <ColorInput
          value={headerConfig.backgroundColor}
          onChange={(newColor) =>
            updateHeaderConfig("backgroundColor", newColor)
          }
          label="Cor de fundo"
          loading={false}
        />

        <ColorInput
          value={headerConfig.textColor}
          onChange={(newColor) => updateHeaderConfig("textColor", newColor)}
          label="Cor do nome da loja"
          loading={false}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome da loja
          </label>
          <input
            type="text"
            value={headerConfig.storeName}
            onChange={(e) => updateHeaderConfig("storeName", e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Digite o nome da loja"
          />
        </div>
      </div>
      <p className="text-sm text-gray-500 text-center mt-4">
        Clique nos quadrados acima para selecionar uma cor. As cores escolhidas
        serão aplicadas ao fundo e ao nome da loja.
      </p>
    </div>
  );
}
