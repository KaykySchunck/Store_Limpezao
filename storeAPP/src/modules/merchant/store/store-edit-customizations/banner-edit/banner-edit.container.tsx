import { storeCustomizationsDivided } from "@/@types/store";
import BannerEditComponent from "./banner-edit.component";
import { useStoreEditContext } from "@/modules/contexts/store-context/store-edit-context";
import { useEffect } from "react";
import { AVAILABLE_BANNERS } from "@/config/banners";

type Props = {
  initialCustomizationsBanner: storeCustomizationsDivided["banner"];
};

export default function BannerEditContainer(inProps: Props) {
  const { initialCustomizationsBanner } = inProps;
  const { bannerInfo, setBannerInfo } = useStoreEditContext();

        // Inicializar o banner se existir dados iniciais
      useEffect(() => {
        if (initialCustomizationsBanner?.imageUrl && !bannerInfo) {
          // Verificar se é um banner pré-disposto
          const isPredefinedBanner = initialCustomizationsBanner.imageUrl.includes('/banners/');
          if (isPredefinedBanner) {
            const fileName = initialCustomizationsBanner.imageUrl.split('/').pop() || '';
            const bannerId = fileName.replace(/\.(svg|jpeg|jpg|png)$/i, '');
            setBannerInfo({
              type: 'predefined',
              id: bannerId,
              path: initialCustomizationsBanner.imageUrl,
              name: `Banner ${bannerId}`
            });
          } else {
            setBannerInfo({
              imageBannerUrl: initialCustomizationsBanner.imageUrl,
              type: 'file'
            });
          }
        }
      }, [initialCustomizationsBanner, bannerInfo, setBannerInfo]);

  return <BannerEditComponent />;
}
