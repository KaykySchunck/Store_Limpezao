export interface CreateItemDTO {
  name: string;
  description: string;
  stock: number;
  value: number;
  fk_idstore: string;
  fk_idcategory: string;
}

export interface ItemDTO {
  id?: string;
  name: string;
  description: string;
  stock: number;
  value: number;
  fk_idstore: string;
  fk_idcategory: string;
}
