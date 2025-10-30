"use client";

import React, { useEffect, useState } from "react";
import { MerchantComponent } from "@/components/layout/wrapper/merchant";
import { StoreProvider } from "@/modules/contexts/store-context/store-context";
import { StoreEditProvider } from "@/modules/contexts/store-context/store-edit-context";

export default function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ merchantId: string }>;
}) {
  const [merchantId, setMerchantId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMerchantId() {
      const resolvedParams = await params;
      setMerchantId(resolvedParams.merchantId);
    }

    fetchMerchantId();
  }, [params]);

  if (merchantId === null) {
    return <div>Loading...</div>;
  }

  return (
    <StoreProvider>
      <StoreEditProvider>
        <MerchantComponent merchantId={merchantId}>
          {children}
        </MerchantComponent>
      </StoreEditProvider>
    </StoreProvider>
  );
}
