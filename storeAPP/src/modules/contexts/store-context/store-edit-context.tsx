"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface HeaderInfo {
  backgroundColor: string;
  textColor: string;
  storeName: string;
}

interface BannerInfo {
  imageBannerUrl?: any;
  type?: 'file' | 'predefined';
  id?: string;
  path?: string;
  name?: string;
}

interface NavbarInfo {
  backgroundColorNavbar: string;
  colorTextNavbar: string;
}

interface CatalogInfo {
  backgroundCatalog: string;
}

interface StoreEditContextType {
  headerInfo: HeaderInfo;
  setHeaderInfo: React.Dispatch<React.SetStateAction<HeaderInfo>>;
  bannerInfo: BannerInfo | null;
  setBannerInfo: React.Dispatch<React.SetStateAction<BannerInfo | null>>;
  navbarInfo: NavbarInfo;
  setNavbarInfo: React.Dispatch<React.SetStateAction<NavbarInfo>>;
  catalogInfo: CatalogInfo;
  setCatalogInfo: React.Dispatch<React.SetStateAction<CatalogInfo>>;
}

const StoreEditContext = createContext<StoreEditContextType | undefined>(
  undefined
);

export const StoreEditProvider = ({ children }: { children: ReactNode }) => {
  const [headerInfo, setHeaderInfo] = useState<HeaderInfo>({
    backgroundColor: "",
    textColor: "",
    storeName: "",
  });

  const [bannerInfo, setBannerInfo] = useState<BannerInfo | null>(null);

  const [navbarInfo, setNavbarInfo] = useState<NavbarInfo>({
    backgroundColorNavbar: "",
    colorTextNavbar: "",
  });

  const [catalogInfo, setCatalogInfo] = useState<CatalogInfo>({
    backgroundCatalog: "",
  });

  return (
    <StoreEditContext.Provider
      value={{
        headerInfo,
        setHeaderInfo,
        bannerInfo,
        setBannerInfo,
        navbarInfo,
        setNavbarInfo,
        catalogInfo,
        setCatalogInfo,
      }}
    >
      {children}
    </StoreEditContext.Provider>
  );
};

export const useStoreEditContext = () => {
  const context = useContext(StoreEditContext);
  if (!context) {
    throw new Error(
      "useStoreEditContext must be used within a StoreEditProvider"
    );
  }
  return context;
};
