import axios from "axios";
import { apiURL } from "../../enviroments";

export const createCategoryService = (
  categoryData: Record<string, any>
): Promise<any> => {
  return axios
    .post(`${apiURL}api/category/create`, categoryData)
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const getCategoriesService = (fk_idstore: string): Promise<any> => {
  return axios
    .get(`${apiURL}api/category/get`, { params: { fk_idstore } })
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const deleteCategoryService = (id: string): Promise<any> => {
  return axios
    .delete(`${apiURL}api/category/delete/${id}`)
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const getCategoryByIdService = (
  fk_idstore: string,
  categoryId: string
): Promise<any> => {
  return axios
    .get(`${apiURL}api/category/get/${categoryId}`, { params: { fk_idstore } })
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const updateCategoryService = (
  id: string,
  name: string
): Promise<any> => {
  return axios
    .put(`${apiURL}api/category/update/${id}`, { name })
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const getCategoryByNameService = (
  fk_idstore: string,
  name: string
): Promise<any> => {
  return axios
    .get(`${apiURL}api/category/getByName/${name}`, { params: { fk_idstore } })
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};
