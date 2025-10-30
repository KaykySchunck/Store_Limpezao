import axios from "axios";
import { apiURL } from "../../enviroments";

export const createMerchantService = (
  merchantData: Record<string, any>
): Promise<any> => {
  return axios
    .post(`${apiURL}api/merchant/create`, merchantData)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      const errorMessage = err.response?.data?.message || err.response?.data || err.message || "Erro ao criar conta";
      return Promise.reject(errorMessage);
    });
};

export const getMerchantByUrlService = (url: string): Promise<any> => {
  return axios
    .get(`${apiURL}api/merchant/${url}`)
    .then((response) => response.data)
    .catch((err) => {
      const errorMessage = err.response?.data?.message || err.response?.data || err.message || "Erro ao buscar merchant";
      return Promise.reject(errorMessage);
    });
};
