import { useStoreCustomizationsContext } from "@/modules/contexts/store-context/store-customer-customizations-context";
import BannerCustomerComponent from "./banner-customer.component";

export default function BannerCustomerContainer() {
  const { bannerInfo } = useStoreCustomizationsContext();

  return <BannerCustomerComponent customizations={bannerInfo} />;
}
