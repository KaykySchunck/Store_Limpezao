"use client";

import { useCreateOrUpdateStoreCustomizations } from "@/hooks/store-customizations/useCreateOrUpdateStoreCustomizations";

import { useGetStoreCustomizationsByStoreId } from "@/hooks/store-customizations/useGetStoreCustomizationsByStoreId";
import StoreEditComponent from "./store-edit.component";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useStoreEditContext } from "@/modules/contexts/store-context/store-edit-context";

type Props = {
  storeId: string;
};

export default function StoreEditContainer({ storeId }: Props) {
  const { 
    headerInfo, 
    navbarInfo, 
    catalogInfo, 
    bannerInfo,
    setHeaderInfo,
    setNavbarInfo,
    setCatalogInfo,
    setBannerInfo
  } = useStoreEditContext();
  const { createOrUpdate } = useCreateOrUpdateStoreCustomizations();

  if (!storeId) {
    toast.error("Selecione uma loja válida para continuar.");
    return null;
  }

  const { data } = useGetStoreCustomizationsByStoreId(storeId);

  // Inicializar o contexto com os dados existentes do banco
  useEffect(() => {
    if (data) {
      console.log("Inicializando contexto com dados:", data);
      
      // Inicializar header
      setHeaderInfo({
        backgroundColor: data.header?.backgroundColor || "",
        textColor: data.header?.colorText || "",
        storeName: data.header?.titleText || "",
      });

      // Inicializar navbar
      setNavbarInfo({
        backgroundColorNavbar: data.navbar?.backgroundColor || "",
        colorTextNavbar: data.navbar?.colorText || "",
      });

      // Inicializar catalog
      setCatalogInfo({
        backgroundCatalog: data.catalog?.backgroundColor || "",
      });

      // Inicializar banner se existir
      if (data.banner?.imageUrl) {
        console.log("Banner encontrado:", data.banner.imageUrl);
        // Verificar se é um banner pré-disposto ou arquivo
        const isPredefinedBanner = data.banner.imageUrl.includes('/banners/');
        if (isPredefinedBanner) {
          const fileName = data.banner.imageUrl.split('/').pop() || '';
          const bannerId = fileName.replace(/\.(svg|jpeg|jpg|png)$/i, '');
          console.log("Banner pré-disposto:", bannerId);
          setBannerInfo({
            type: 'predefined',
            id: bannerId,
            path: data.banner.imageUrl,
            name: `Banner ${bannerId}`
          });
        } else {
          console.log("Banner arquivo:", data.banner.imageUrl);
          setBannerInfo({
            imageBannerUrl: data.banner.imageUrl,
            type: 'file'
          });
        }
      } else {
        console.log("Nenhum banner encontrado");
      }
    }
  }, [data, setHeaderInfo, setNavbarInfo, setCatalogInfo, setBannerInfo]);

  const layoutData = {
    backgroundColorHeader: headerInfo.backgroundColor,
    colorTextTitleHeader: headerInfo.textColor,
    titleHeaderText: headerInfo.storeName,
    imageBanner: bannerInfo?.type === 'file' ? bannerInfo.imageBannerUrl : null,
    imageBannerUrl: bannerInfo?.type === 'predefined' ? bannerInfo.path : undefined,
    backgroundColorNavbar: navbarInfo.backgroundColorNavbar,
    colorTextNavbar: navbarInfo.colorTextNavbar,
    backgroundCatalog: catalogInfo.backgroundCatalog,
    fk_storeId: storeId,
  };

  if (!data) {
    return <p>Carregando...</p>;
  }

  async function handleSaveLayout() {
    console.log("=== DEBUG SALVAMENTO ===");
    console.log("bannerInfo:", bannerInfo);
    console.log("layoutData:", layoutData);
    console.log("imageBanner:", layoutData.imageBanner);
    console.log("imageBannerUrl:", layoutData.imageBannerUrl);
    console.log("========================");
    
    try {
      await createOrUpdate(layoutData);
      toast.success("Customização de layout salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar layout.");
    }
  }

  return (
    <StoreEditComponent
      initialCustomizationsData={data}
      saveLayout={handleSaveLayout}
    />
  );
}
