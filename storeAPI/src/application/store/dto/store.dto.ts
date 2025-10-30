export type CreateStoreDTO = {
  id?: string;
  name: string;
  url: string;
  whatsApp: string;
  merchantId: string;
};

export type StorecustomizationsDTO = {
  id?: string;
  backgroundColorHeader: string;
  colorTextTitleHeader: string;
  titleHeaderText: string;
  imageBanner?: any;
  imageBannerUrl?: string;
  imageBannerKey?: any;

  backgroundColorNavbar: string;
  colorTextNavbar: string;

  backgroundCatalog: string;

  fk_storeId?: string;
  createdAt?: string;
  updatedAt?: string;
};
