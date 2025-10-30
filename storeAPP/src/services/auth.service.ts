import axios from "axios";
import { apiURL } from "../../enviroments";
import { merchantSignInPayload } from "@/@types/sign-in";

export const loginAuthEmailService = (
  loginData: merchantSignInPayload
): Promise<any> => {
  return axios
    .post(`${apiURL}api/auth/email`, loginData)
    .then((response) => response)
    .catch((err) => err.response?.data || err.message);
};
