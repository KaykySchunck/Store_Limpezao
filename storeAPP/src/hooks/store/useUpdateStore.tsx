import { Store } from "@/@types/store";
import { updateStoreService } from "@/services/store.service";

export function useUpdateStore() {
  const updateStore = async (id: string, storeData: Store) => {
    try {
      const result = await updateStoreService(id, storeData);
      return {
        success: true,
        data: result,
        message: "Loja atualizada com sucesso.",
      };
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "Erro ao atualizar a loja.";
      return {
        success: false,
        error: errorMessage,
        statusCode: err?.response?.status || 500,
      };
    }
  };

  return { updateStore };
}
