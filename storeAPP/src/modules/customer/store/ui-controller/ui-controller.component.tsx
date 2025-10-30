import { storeCustomizationsDivided } from "@/@types/store";
import BannerCustomerContainer from "../banner-customer/banner-customer.container";
import NavbarContainer from "../navbar/navbar.container";
import StoreCatalogContainer from "../store-catalog/store-catalog.container";
import HeaderCustomerContainer from "../header-customer/header-customer.container";

type Props = {
  storeId: string;
};

export default function UiControllerComponent(inProps: Props) {
  const { storeId } = inProps;

  return (
    <>
      <HeaderCustomerContainer />
      <BannerCustomerContainer />
      <NavbarContainer storeId={storeId} />
      <StoreCatalogContainer storeId={storeId} />
    </>
  );
}
