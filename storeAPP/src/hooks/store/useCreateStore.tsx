import { CreateStore } from "@/@types/store";
import { createStoreService } from "@/services/store.service";

export function useCreateStore() {
  const createStore = async (storeData: CreateStore) => {
    try {
      const result = await createStoreService(storeData);
      return { success: true, result };
    } catch (err: any) {
      return { success: false, error: err };
    }
  };

  return { createStore };
}
