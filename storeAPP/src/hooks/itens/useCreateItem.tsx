import { CreateItensPayload } from "@/@types/itens";
import { createItemService } from "@/services/itens.service";

export function useCreateItem() {
  const createItem = async (itemData: CreateItensPayload) => {
    try {
      const result = await createItemService(itemData);
      return { success: true, result };
    } catch (err: any) {
      return { success: false, error: err };
    }
  };

  return { createItem };
}
