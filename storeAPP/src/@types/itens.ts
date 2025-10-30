export type CreateItensPayload = {
  name: string;
  categorie: string;
  description: string;
  value: number;
  stock: number;
  fk_idstore: string;
  fk_idcategory: string;
};

export type ItensPayload = {
  id: string;
  name: string;
  categorie: string;
  description: string;
  value: number;
  stock: number;
};

export type Item = {
  id: string;
  name: string;
  categorie: string;
  description: string;
  value: number;
  stock: number;
};
