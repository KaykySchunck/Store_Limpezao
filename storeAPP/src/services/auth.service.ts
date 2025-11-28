import axios from "axios";
import { apiURL } from "../../enviroments";
import { merchantSignInPayload } from "@/@types/sign-in";

export const loginAuthEmailService = (
  loginData: merchantSignInPayload
): Promise<any> => {
  return axios
    .post(`${apiURL}api/auth/email`, loginData, {
      timeout: 10000, // Timeout de 10 segundos
    })
    .then((response) => response)
    .catch((err) => {
      // Melhor tratamento de erros
      if (err.code === 'ECONNABORTED') {
        throw new Error("Tempo de conexão esgotado. Verifique se o servidor está rodando.");
      }
      if (err.response) {
        // Erro com resposta do servidor
        throw new Error(err.response.data?.message || "Erro ao fazer login.");
      }
      if (err.request) {
        // Erro de rede (servidor não respondeu)
        throw new Error("Não foi possível conectar ao servidor. Verifique se a API está rodando.");
      }
      throw new Error(err.message || "Erro desconhecido ao fazer login.");
    });
};
