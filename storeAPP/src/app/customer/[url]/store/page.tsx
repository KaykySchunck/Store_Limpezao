"use client";

import { useParams } from "next/navigation";
import UiControllerContainer from "@/modules/customer/store/ui-controller/ui-controller.container";
import React from "react";

export default function StorePage() {
  const { url } = useParams();

  if (!url || Array.isArray(url)) {
    return <div>Carregando...</div>;
  }

  return <UiControllerContainer url={url} />;
}
