"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import toast from "react-hot-toast";
import StoresPageContainer from "@/modules/merchant/store/stores-page/stores-page.container";
import { use } from "react";

function DashboardContent({ params }: { params: Promise<{ merchantId: string }> }) {
  const { merchantId } = use(params);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const subscription = searchParams.get("subscription");

 

  return <StoresPageContainer merchantId={merchantId} />;
}

export default function DashboardPage({ params }: { params: Promise<{ merchantId: string }> }) {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    }>
      <DashboardContent params={params} />
    </Suspense>
  );
}
