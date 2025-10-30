export type CreateStore = {
  name: string | undefined;
  url: string | undefined;
  whatsApp: string | undefined;
  merchantId: string | undefined;
};

export type Store = {
  id?: string | undefined;
  name: string | undefined;
  url: string | undefined;
  whatsApp: string | undefined;
  merchantId: string | undefined;
};

export type StoreCustomizations = {
  backgroundCatalog: string;
  backgroundColorHeader: string;
  backgroundColorNavbar: string;
  colorTextNavbar: string;
  colorTextTitleHeader: string;
  createdAt: string;
  fk_storeId: string;
  id: string;
  imageBannerUrl: string | null;
  titleHeaderText: string;
  updatedAt: string;
};

export type storeCustomizationsDivided = {
  header: {
    backgroundColor: string;
    colorText: string;
    colorTextTitleHeader?: string;
    titleText: string;
  };
  banner: {
    imageUrl: string | null;
  };
  navbar: {
    backgroundColor: string;
    colorText: string;
  };
  catalog: {
    backgroundColor: string;
  };
};
