"use client";

import React from "react";
import { MerchantComponent } from "@/components/layout/wrapper/merchant";
import { StoreProvider } from "@/modules/contexts/store-context/store-context";

interface MerchantLayoutWrapperProps {
  children: React.ReactNode;
  merchantId: string;
}

export function MerchantLayoutWrapper({ children, merchantId }: MerchantLayoutWrapperProps) {
  return (
    <StoreProvider>
      <MerchantComponent merchantId={merchantId}>
        {children}
      </MerchantComponent>
    </StoreProvider>
  );
} 