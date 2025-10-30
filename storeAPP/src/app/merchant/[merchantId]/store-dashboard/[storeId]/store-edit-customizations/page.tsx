"use client";

import StoreEditContainer from "@/modules/merchant/store/store-edit-customizations/store-edit.container";
import React from "react";
import { use } from "react";

type Params = {
  storeId: string;
};

export default function StoreEditCustomizationsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { storeId } = use(params);

  return <StoreEditContainer storeId={storeId} />;
}
