"use client";

import HeaderCustomerComponent from "./header-customer.component";
import { useRouter } from "next/navigation";
import { URL_SHOPPING_CART } from "@/constants/urls";
import { useStoreCustomizationsContext } from "@/modules/contexts/store-context/store-customer-customizations-context";

export default function HeaderCustomerContainer() {
  const { headerInfo } = useStoreCustomizationsContext();
  const router = useRouter();

  function cart() {
    router.push(`./store/${URL_SHOPPING_CART}`);
  }

  return <HeaderCustomerComponent cart={cart} customizations={headerInfo} />;
}
