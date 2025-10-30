"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CatalogProviderProps = {
  children: ReactNode;
};

type CatalogContextType = {
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string) => void;
};

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const useCatalogContext = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalogContext must be used within a CatalogProvider");
  }
  return context;
};

export const CatalogProvider = ({ children }: CatalogProviderProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  return (
    <CatalogContext.Provider
      value={{ selectedCategoryId, setSelectedCategoryId }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
