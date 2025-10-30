export type Category = {
  id: string;
  name: string;
  fk_idstore: string;
};

export type CreateCategoryPayload = {
  name: string;
  fk_idstore: string;
};
