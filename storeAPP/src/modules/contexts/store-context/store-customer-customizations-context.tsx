"use client";

import { useGetStoreCustomizationsByStoreId } from "@/hooks/store-customizations/useGetStoreCustomizationsByStoreId";
import { useGetStoreByUrl } from "@/hooks/store/useGetStoreByUrl";
import { useParams } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface HeaderInfo {
  backgroundColor: string;
  colorText: string;
  titleText: string;
}

interface BannerInfo {
  imageUrl: string;
}

interface NavbarInfo {
  backgroundColor: string;
  colorText: string;
}

interface CatalogInfo {
  backgroundColor: string;
}

interface StoreCustomizationsContextType {
  headerInfo: HeaderInfo;
  setHeaderInfo: React.Dispatch<React.SetStateAction<HeaderInfo>>;
  bannerInfo: BannerInfo;
  setBannerInfo: React.Dispatch<React.SetStateAction<BannerInfo>>;
  navbarInfo: NavbarInfo;
  setNavbarInfo: React.Dispatch<React.SetStateAction<NavbarInfo>>;
  catalogInfo: CatalogInfo;
  setCatalogInfo: React.Dispatch<React.SetStateAction<CatalogInfo>>;
}

const StoreCustomizationsContext = createContext<
  StoreCustomizationsContextType | undefined
>(undefined);

export const StoreCustomerCustomizationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [headerInfo, setHeaderInfo] = useState<HeaderInfo>({
    backgroundColor: "",
    colorText: "",
    titleText: "",
  });

  const [bannerInfo, setBannerInfo] = useState<BannerInfo>({
    imageUrl: "",
  });

  const [navbarInfo, setNavbarInfo] = useState<NavbarInfo>({
    backgroundColor: "",
    colorText: "",
  });

  const [catalogInfo, setCatalogInfo] = useState<CatalogInfo>({
    backgroundColor: "",
  });

  const { url } = useParams();
  const storeUrl = typeof url === "string" ? url : "";
  const { store } = useGetStoreByUrl(storeUrl);
  const storeId = store?.id ?? "";

  const { data: customizations } = useGetStoreCustomizationsByStoreId(storeId);

  useEffect(() => {
    if (customizations) {
      console.log("Customizations:", customizations);

      const header = customizations.header || {};

      setHeaderInfo({
        backgroundColor: header.backgroundColor || "",
        colorText: header.colorText || "",
        titleText: header.titleText || "",
      });

      setBannerInfo({
        imageUrl: customizations.banner?.imageUrl || "",
      });

      setNavbarInfo({
        backgroundColor: customizations.navbar?.backgroundColor || "",
        colorText: customizations.navbar?.colorText || "",
      });

      setCatalogInfo({
        backgroundColor: customizations.catalog?.backgroundColor || "",
      });
    }
  }, [
    customizations,
    setHeaderInfo,
    setBannerInfo,
    setNavbarInfo,
    setCatalogInfo,
  ]);

  if (!customizations) {
    return <div>loading...</div>;
  }

  return (
    <StoreCustomizationsContext.Provider
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
    </StoreCustomizationsContext.Provider>
  );
};

export const useStoreCustomizationsContext = () => {
  const context = useContext(StoreCustomizationsContext);
  if (!context) {
    throw new Error(
      "useStoreCustomizationsContext must be used within a StoreCustomizationsProvider"
    );
  }
  return context;
};
