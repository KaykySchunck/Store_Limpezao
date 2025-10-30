"use client";

import { Store } from "@/@types/store";
import React, { createContext, useContext, useState, ReactNode } from "react";

type StoreContextType = {
  store: Store | null;
  setStore: (store: Store) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

const persistStoreInSessionStorage = (store: Store) => {
  sessionStorage.setItem("selectedStore", JSON.stringify(store));
};

const getStoreFromSessionStorage = (): Store | null => {
  const store = sessionStorage.getItem("selectedStore");
  return store ? JSON.parse(store) : null;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStoreState] = useState<Store | null>(() =>
    getStoreFromSessionStorage()
  );

  const setStore = (store: Store) => {
    setStoreState(store);
    persistStoreInSessionStorage(store);
  };

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};
