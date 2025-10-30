import React from "react";
import { MerchantLayoutWrapper } from "@/components/layout/wrapper/MerchantLayoutWrapper";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ merchantId: string }>;
}) {
  const { merchantId } = await params;
  
  return (
    <MerchantLayoutWrapper merchantId={merchantId}>
      {children}
    </MerchantLayoutWrapper>
  );
}
