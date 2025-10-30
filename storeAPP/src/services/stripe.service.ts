import axios from "axios";
import { apiURL } from "../../enviroments";

export interface CreateCheckoutSessionData {
  merchantId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CreatePortalSessionData {
  merchantId: string;
  returnUrl: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
}

export const createCheckoutSession = (
  data: CreateCheckoutSessionData
): Promise<any> => {
  return axios
    .post(`${apiURL}api/stripe/create-checkout-session`, data)
    .then((response) => response.data)
    .catch((err) => {
      throw err.response?.data || err.message;
    });
};

export const createPortalSession = (
  data: CreatePortalSessionData
): Promise<any> => {
  return axios
    .post(`${apiURL}api/stripe/create-portal-session`, data)
    .then((response) => response.data)
    .catch((err) => {
      throw err.response?.data || err.message;
    });
};

export const getPlans = (): Promise<{ plans: Plan[] }> => {
  return axios
    .get(`${apiURL}api/stripe/plans`)
    .then((response) => response.data)
    .catch((err) => {
      throw err.response?.data || err.message;
    });
}; 