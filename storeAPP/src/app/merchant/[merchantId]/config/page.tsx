import ConfigFormContainer from "@/modules/merchant/config/form/form.container";
import React from "react";

export default function ConfigPage() {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-gray-800 font-semibold text-2xl">Configurações</h1>
      <div className="h-full">
        <ConfigFormContainer />
      </div>
    </div>
  );
}
