"use client";

import { useEffect, useState } from "react";
import { Store } from "@/@types/store";
import { getPersistedValue, persistOnSessionStorage } from "./storage";

const STORAGE_KEY = "selectedStore";

export function useStoreStorage() {
  const [store, setStore] = useState<Store | undefined>(() => {
    const persistedStore = getPersistedValue(STORAGE_KEY);
    return persistedStore ? JSON.parse(persistedStore) : undefined;
  });

  useEffect(() => {
    if (store) {
      persistOnSessionStorage(STORAGE_KEY, JSON.stringify(store));
    } else {
      persistOnSessionStorage(STORAGE_KEY, undefined);
    }
  }, [store]);

  return { store, setStore };
}
