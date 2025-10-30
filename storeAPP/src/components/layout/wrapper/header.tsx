"use client";

import { Button } from "@/components/ui";
import { Autocomplete } from "@/components/ui/autocomplete";
import { useGetStoreByMerchantId } from "@/hooks/store/useGetStoreByMerchantId";
import { useStoreContext } from "@/modules/contexts/store-context/store-context";
import { GearSix, HandWaving } from "@phosphor-icons/react";
import Link from "next/link";
import { useState, useEffect } from "react";

type HeaderComponentProps = {
  merchantId: string;
};

export function HeaderComponent({ merchantId }: HeaderComponentProps) {
  const { stores } = useGetStoreByMerchantId(merchantId);
  const { store, setStore } = useStoreContext();
  // const [selectedStore, setSelectedStore] = useState<string>(store?.name ?? "");

  // const handleChooicedValueStore = (value: string) => {
  //   const selected = stores?.find((store) => store.name === value);
  //   if (selected) {
  //     setStore(selected);
  //     setSelectedStore(value);
  //   }
  // };

  // useEffect(() => {
  //   if (store?.name) {
  //     setSelectedStore(store.name);
  //   }
  // }, [store]);

  useEffect(() => {
    if (stores && stores.length > 0) {
      setStore(stores[0]);
    }
  }, [stores, setStore]);

  if (!stores) {
    return <p>Carregando lojas...</p>;
  }

  return (
    <header className="w-full flex flex-col px-6 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <HandWaving weight="fill" className="text-blue-700" size={32} />
          <h1 className="text-gray-800 text-xl font-medium">Olá usuário</h1>
        </div>
        <div className="flex gap-4 items-center">
          {/* <Autocomplete
            options={stores.map((store) => ({
              label: store.name || "Loja não disponível",
              value: store.name || "ID não disponível",
            }))}
            label="Escolher Loja"
            placeholder={
              stores.length > 0
                ? "Selecione uma loja"
                : "Nenhuma loja disponível"
            }
            value={selectedStore}
            onValueChange={handleChooicedValueStore}
          /> */}
          {/* <Link href="/config">
            <Button variant="outline" className="flex gap-2 items-center">
              Configurar
              <GearSix size={20} />
            </Button>
          </Link> */}
        </div>
      </div>
    </header>
  );
}
