import { useState, useEffect } from "react";
import BannerCustomizationModal from "../modal/banner-customization-modal/banner-customization-modal.component";
import BannerCustomizationModalContainer from "../modal/banner-customization-modal/banner-customization-modal.container";
import { AVAILABLE_BANNERS } from "@/config/banners";
import { useStoreEditContext } from "@/modules/contexts/store-context/store-edit-context";

export default function BannerEditComponent() {
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { bannerInfo } = useStoreEditContext();

  // Sincronizar estado local com contexto
  useEffect(() => {
    if (bannerInfo) {
      console.log("BannerEditComponent - bannerInfo atualizado:", bannerInfo);
      if (bannerInfo.type === 'predefined' && bannerInfo.id) {
        setSelectedBannerId(bannerInfo.id);
      }
    }
  }, [bannerInfo]);

  function toggleModal() {
    setShowModal(!showModal);
  }

  function handleRemoveBanner() {
    setBannerFile(null);
    setSelectedBannerId(null);
  }

  // Função para obter a URL do banner atual
  function getCurrentBannerUrl() {
    // Prioridade 1: Arquivo selecionado localmente
    if (bannerFile) {
      return URL.createObjectURL(bannerFile);
    }
    
    // Prioridade 2: Banner pré-disposto selecionado localmente
    if (selectedBannerId) {
      const selectedBanner = AVAILABLE_BANNERS.find(banner => banner.id === selectedBannerId);
      return selectedBanner?.path || '';
    }
    
    // Prioridade 3: Banner do contexto (salvo no banco)
    if (bannerInfo) {
      if (bannerInfo.type === 'predefined') {
        return bannerInfo.path;
      } else if (bannerInfo.type === 'file' && bannerInfo.imageBannerUrl) {
        return bannerInfo.imageBannerUrl;
      }
    }
    
    return null;
  }

  const currentBannerUrl = getCurrentBannerUrl();
  const hasBanner = currentBannerUrl !== null;

  // Debug logs
  console.log("BannerEditComponent - bannerInfo:", bannerInfo);
  console.log("BannerEditComponent - currentBannerUrl:", currentBannerUrl);
  console.log("BannerEditComponent - hasBanner:", hasBanner);

  // Determinar se é banner pré-disposto
  const isPredefinedBanner = selectedBannerId || (bannerInfo?.type === 'predefined');

  return (
    <div>
      <section className="cursor-pointer" onClick={toggleModal}>
        {hasBanner ? (
          <div className="relative w-full h-56">
            <img
              src={currentBannerUrl!}
              alt="Banner"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Erro ao carregar imagem:", currentBannerUrl);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log("Imagem carregada com sucesso:", currentBannerUrl);
              }}
            />
            {isPredefinedBanner && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                Pré-disposto
              </div>
            )}
          </div>
        ) : (
          <div
            style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
            className="bg-blue-700 text-white"
          >
            <div className="mx-auto text-center">
              <h2 className="text-4xl font-bold">
                Clique aqui para personalizar seu banner!
              </h2>
              <p className="mt-4 text-lg">
                Escolha entre nossos banners pré-dispostos ou faça upload do seu próprio arquivo
              </p>
              <p className="mt-4 text-lg">
                (Caso você não adicione nada aqui essa parte não irá aparecer no site)
              </p>
            </div>
          </div>
        )}
      </section>

      {showModal && (
        <BannerCustomizationModalContainer
          bannerFile={bannerFile}
          setBannerFile={setBannerFile}
          onClose={toggleModal}
          onRemove={handleRemoveBanner}
          selectedBannerId={selectedBannerId}
          setSelectedBannerId={setSelectedBannerId}
        />
      )}
    </div>
  );
}
