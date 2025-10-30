import axios from "axios";
import { apiURL } from "../../enviroments";

export const createImageItemService = async (formData: any) => {
  return axios.post(`${apiURL}api/imagesItens/create`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getImagesByItemIdService = async (fk_id_item: string) => {
  return axios.get(`${apiURL}api/imagesItens/get-image-item-id`, {
    params: { fk_id_item }, // Passa o fk_id_item como parâmetro de consulta
  });
};

export const deleteImageItemService = async (imageId: string) => {
  return axios.delete(`${apiURL}api/imagesItens/delete-image-item/${imageId}`);
};
