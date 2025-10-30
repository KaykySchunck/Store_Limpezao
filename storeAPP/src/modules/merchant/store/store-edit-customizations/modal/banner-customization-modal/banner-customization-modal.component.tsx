import { Button } from "@/components/ui";
import { X, Image, Upload } from "@phosphor-icons/react";

interface BannerCustomizationModalProps {
  bannerFile: File | null;
  selectedBannerId: string | null;
  onClose: () => void;
  onRemove: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectPredefinedBanner: () => void;
  hasPredefinedBanner: boolean;
}

export default function BannerCustomizationModalComponent({
  bannerFile,
  selectedBannerId,
  onClose,
  onRemove,
  handleFileChange,
  onSelectPredefinedBanner,
  hasPredefinedBanner,
}: BannerCustomizationModalProps) {
  return (
    <div
      style={{ width: "28rem", padding: "1rem" }}
      className="absolute top-full mt-2 z-10 bg-white rounded-lg shadow-md border border-gray-300"
    >
      <div style={{ justifyContent: "end" }} className="flex">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Personalizar Banner
          </h3>
        </div>

        {/* Opção 1: Selecionar Banner Pré-disposto */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Opção 1: Selecionar Banner Pré-disposto
          </label>
          <Button
            onClick={onSelectPredefinedBanner}
            className="w-full flex items-center justify-center gap-2"
            variant="outline"
          >
            <Image size={20} />
            Escolher Banner Pré-disposto
          </Button>
          {hasPredefinedBanner && (
            <p className="text-xs text-green-600">
              ✓ Banner pré-disposto selecionado
            </p>
          )}
        </div>

        {/* Separador */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        {/* Opção 2: Upload de Arquivo */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Opção 2: Fazer Upload de Arquivo
          </label>
          <input
            id="banner-file"
            type="file"
            accept="image/*"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            onChange={handleFileChange}
          />
          {bannerFile && (
            <p className="text-xs text-green-600">
              ✓ Arquivo selecionado: {bannerFile.name}
            </p>
          )}
        </div>

        {/* Botão de Remover */}
        {(bannerFile || hasPredefinedBanner) && (
          <div className="pt-2">
            <Button 
              onClick={onRemove}
              variant="destructive"
              className="w-full"
            >
              Remover Banner
            </Button>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 text-center mt-4">
        Escolha entre nossos banners pré-dispostos ou faça o upload do seu próprio arquivo de imagem.
      </p>
    </div>
  );
}
