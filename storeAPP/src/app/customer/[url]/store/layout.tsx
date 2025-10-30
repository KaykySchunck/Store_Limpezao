import React from "react";
import { StoreCustomerCustomizationsProvider } from "@/modules/contexts/store-context/store-customer-customizations-context";
import { CatalogProvider } from "@/modules/contexts/store-context/catalog-context";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreCustomerCustomizationsProvider>
      <CatalogProvider>
        {children}
      </CatalogProvider>
    </StoreCustomerCustomizationsProvider>
  );
}
