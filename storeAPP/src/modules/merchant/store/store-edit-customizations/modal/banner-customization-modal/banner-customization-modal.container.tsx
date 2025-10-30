import { useState, useEffect } from 'react';
import { useStoreEditContext } from "@/modules/contexts/store-context/store-edit-context";
import BannerCustomizationModalComponent from "./banner-customization-modal.component";
import BannerSelectorComponent from "@/components/BannerSelector";
import { AVAILABLE_BANNERS, BannerOption } from "@/config/banners";

// Importar o tipo BannerInfo do contexto
type BannerInfo = {
  imageBannerUrl?: any;
  type?: 'file' | 'predefined';
  id?: string;
  path?: string;
  name?: string;
};

interface BannerCustomizationModalProps {
  bannerFile: File | null;
  setBannerFile: (file: File | null) => void;
  onClose: () => void;
  onRemove: () => void;
  selectedBannerId?: string | null;
  setSelectedBannerId?: (id: string | null) => void;
}

export default function BannerCustomizationModalContainer({
  bannerFile,
  setBannerFile,
  onClose,
  onRemove,
  selectedBannerId: externalSelectedBannerId,
  setSelectedBannerId: externalSetSelectedBannerId,
}: BannerCustomizationModalProps) {
  const { bannerInfo, setBannerInfo } = useStoreEditContext();
  const [internalSelectedBannerId, setInternalSelectedBannerId] = useState<string | null>(null);
  const [showBannerSelector, setShowBannerSelector] = useState(false);

  // Usar estado externo se fornecido, senão usar interno
  const selectedBannerId = externalSelectedBannerId !== undefined ? externalSelectedBannerId : internalSelectedBannerId;
  const setSelectedBannerId = externalSetSelectedBannerId || setInternalSelectedBannerId;

  // Sincronizar estado local com contexto quando modal abrir
  useEffect(() => {
    if (bannerInfo) {
      if (bannerInfo.type === 'predefined' && bannerInfo.id) {
        setSelectedBannerId(bannerInfo.id);
      }
    }
  }, [bannerInfo, setSelectedBannerId]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setBannerFile(file);
    if (file) {
      setBannerInfo({
        type: 'file',
        imageBannerUrl: file // Manter o arquivo File para ser enviado no FormData
      });
    }
    setSelectedBannerId(null); // Limpar banner pré-disposto se arquivo for selecionado
    console.log("Arquivo selecionado:", file);
    onClose();
  }

  function handleSelectPredefinedBanner() {
    setShowBannerSelector(true);
  }

  function handleBannerSelection(bannerId: string) {
    setSelectedBannerId(bannerId);
    setBannerFile(null); // Limpar arquivo se banner pré-disposto for selecionado
    
    // Encontrar o banner selecionado
    const selectedBanner = AVAILABLE_BANNERS.find(banner => banner.id === bannerId);
    if (selectedBanner) {
      // Criar um objeto que simula um arquivo para o contexto
      const bannerInfo: BannerInfo = {
        type: 'predefined',
        id: bannerId,
        path: selectedBanner.path,
        name: selectedBanner.name
      };
      setBannerInfo(bannerInfo);
    }
    
    setShowBannerSelector(false);
    onClose();
  }

  function handleRemoveBanner() {
    setBannerFile(null);
    setSelectedBannerId(null);
    setBannerInfo(null);
    onRemove();
  }

  const hasPredefinedBanner = selectedBannerId !== null;

  return (
    <>
      <BannerCustomizationModalComponent
        bannerFile={bannerFile}
        selectedBannerId={selectedBannerId}
        onClose={onClose}
        onRemove={handleRemoveBanner}
        handleFileChange={handleFileChange}
        onSelectPredefinedBanner={handleSelectPredefinedBanner}
        hasPredefinedBanner={hasPredefinedBanner}
      />

      {showBannerSelector && (
        <BannerSelectorComponent
          banners={AVAILABLE_BANNERS}
          selectedBanner={selectedBannerId}
          onSelectBanner={handleBannerSelection}
          onClose={() => setShowBannerSelector(false)}
        />
      )}
    </>
  );
}
