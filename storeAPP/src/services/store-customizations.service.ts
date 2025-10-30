import axios from "axios";
import { apiURL } from "../../enviroments";

export const createOrUpdateStoreCustomizations = (
  createStoreData: Record<string, any>
): Promise<any> => {
  const formData = new FormData();

  console.log("=== DEBUG SERVIÇO ===");
  console.log("Dados recebidos:", createStoreData);

  // Adiciona todos os campos ao FormData
  Object.keys(createStoreData).forEach((key) => {
    if (key === "imageBanner" && createStoreData[key]) {
      // Trata o imageBanner como arquivo
      console.log("Adicionando arquivo:", createStoreData[key]);
      formData.append(key, createStoreData[key], createStoreData[key].name);
    } else if (key === "imageBannerUrl" && createStoreData[key]) {
      // Trata o imageBannerUrl como string para banners pré-dispostos
      console.log("Adicionando URL:", createStoreData[key]);
      formData.append(key, createStoreData[key]);
    } else if (createStoreData[key] !== undefined && createStoreData[key] !== null) {
      // Outros campos como texto
      console.log(`Adicionando ${key}:`, createStoreData[key]);
      formData.append(key, createStoreData[key]);
    }
  });

  console.log("FormData criado:", formData);
  console.log("=====================");

  return axios
    .put(
      `${apiURL}api/storeCustomizations/createOrUpdateStoreCustomizations`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Define explicitamente o tipo
        },
      }
    )
    .then((response) => response.data)
    .catch((err) => {
      throw err.response?.data || err.message;
    });
};

export const getStoreCustomizationsByStoreId = (
  fk_storeId: string
): Promise<any> => {
  return axios
    .get(
      `${apiURL}api/storeCustomizations/getStoreCustomizationsByStoreId/${fk_storeId}`
    )
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const editStoreCustomizations = (
  id: string,
  updateData: Record<string, any>
): Promise<any> => {
  return axios
    .patch(`${apiURL}api/storeCustomizations/${id}`, updateData)
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};

export const createStoreCustomizations = (fk_storeId: string): Promise<any> => {
  return axios
    .post(`${apiURL}api/storeCustomizations/createLayoutCustomizationsStore`, {
      fk_storeId,
    })
    .then((response) => response.data)
    .catch((err) => err.response?.data || err.message);
};
