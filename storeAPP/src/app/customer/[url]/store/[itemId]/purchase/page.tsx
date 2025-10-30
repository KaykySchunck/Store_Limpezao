"use client";

import { useParams } from "next/navigation";
import PurchaseItemDetailsContainer from "@/modules/customer/purchase/purchaseItemDetails/purchaseItemDetails.container";
import HeaderCustomerContainer from "@/modules/customer/store/header-customer/header-customer.container";

export default function PurchasePage() {
  const { itemId } = useParams();

  return (
    <>
      <PurchaseItemDetailsContainer itemId={itemId as string | undefined} />
    </>
  );
}
