import axios from "axios";
import { apiURL } from "../../enviroments";

export const createStoreService = (
  createStoreData: Record<string, any>
): Promise<any> => {
  return axios
    .post(`${apiURL}api/store/create`, createStoreData)
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const getStoreByMerchantIdService = (
  merchantId: string
): Promise<any> => {
  return axios
    .get(`${apiURL}api/store/getByMerchant/${merchantId}`)
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const getStoreByUrlService = (url: string): Promise<any> => {
  return axios
    .get(`${apiURL}api/store/getStoreByUrl/${url}`)
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const getStoreByIdService = (id: string): Promise<any> => {
  return axios
    .get(`${apiURL}api/store/getStoreById/${id}`)
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const getStoreByNameService = (
  merchantId: string,
  name: string
): Promise<any> => {
  return axios
    .get(`${apiURL}api/store/getStoreByName/${merchantId}`, {
      params: { name },
    })
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const updateStoreService = (
  id: string,
  updateStoreData: Record<string, any>
): Promise<any> => {
  return axios
    .put(`${apiURL}api/store/update/${id}`, updateStoreData)
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};
