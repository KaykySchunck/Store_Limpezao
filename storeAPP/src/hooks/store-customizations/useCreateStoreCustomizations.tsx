import { createStoreCustomizations } from "@/services/store-customizations.service";

export function useCreateStoreCustomizations() {
  const handleCreateStoreCustomizations = async (fk_storeId: string) => {
    try {
      const result = await createStoreCustomizations(fk_storeId);
      return { success: true, result };
    } catch (err: any) {
      return { success: false, error: err };
    }
  };

  return { handleCreateStoreCustomizations };
}
