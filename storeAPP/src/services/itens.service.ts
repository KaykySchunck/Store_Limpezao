import axios from "axios";
import { apiURL } from "../../enviroments";

export const createItemService = (
  itemData: Record<string, any>
): Promise<any> => {
  return axios
    .post(`${apiURL}api/item/create`, itemData)
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const getItensService = (
  fk_idstore: string,
  fk_idcategory?: string
): Promise<any> => {
  const params: Record<string, string> = { fk_idstore };

  if (fk_idcategory) {
    params.fk_idcategory = fk_idcategory;
  }

  return axios
    .get(`${apiURL}api/item/get`, { params })
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const getItemByIdService = (id: string): Promise<any> => {
  return axios
    .get(`${apiURL}api/item/getItemById/${id}`)
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const getItemByNameService = (
  fk_idstore: string,
  name: string
): Promise<any> => {
  return axios
    .get(`${apiURL}api/item/getItemByName/${name}`, {
      params: { fk_idstore },
    })
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const getItensWithImagesService = (
  fk_idstore: string,
  fk_idcategory?: string
): Promise<any> => {
  const params: Record<string, string> = { fk_idstore };

  if (fk_idcategory) {
    params.fk_idcategory = fk_idcategory;
  }

  return axios
    .get(`${apiURL}api/item/get-itens-and-images`, { params })
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const getItemWithImagesByIdService = (itemId: string): Promise<any> => {
  return axios
    .get(`${apiURL}api/item/get-item-with-images/${itemId}`) // Endpoint para buscar o item pelo ID
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const deleteItemService = (
  id: string,
  fk_idcategory?: string
): Promise<any> => {
  const params: any = {};

  if (fk_idcategory) {
    params.fk_idcategory = fk_idcategory;
  }

  return axios
    .delete(`${apiURL}api/item/delete/${id}`, { params })
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const updateItemService = (
  id: string,
  itemData: Record<string, any>
): Promise<any> => {
  return axios
    .put(`${apiURL}api/item/update/${id}`, itemData)
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};
