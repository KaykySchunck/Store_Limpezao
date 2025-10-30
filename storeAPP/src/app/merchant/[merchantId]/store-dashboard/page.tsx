"use client";

import { Button, Input } from "@/components/ui";
import { URL_CREATE, URL_DETAIL, URL_STORE_DASHBOARD } from "@/constants/urls";
import ListStoresContainer from "@/modules/merchant/store/list-stores/list-stores.container";

import SearchStoreContainer from "@/modules/merchant/store/search/search-store.container";
import StoresPageContainer from "@/modules/merchant/store/stores-page/stores-page.container";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { use } from "react";

type Params = {
  merchantId: string;
};

export default function StoreDashboardPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { merchantId } = use(params);

  return <StoresPageContainer merchantId={merchantId} />;
}
