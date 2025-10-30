import { CreateItensPayload } from "@/@types/itens";
import { updateItemService } from "@/services/itens.service";

export function useUpdateItem() {
  const updateItem = async (id: string, itemData: CreateItensPayload) => {
    try {
      const response = await updateItemService(id, itemData);

      return {
        success: true,
        data: response,
        message: "Item atualizado com sucesso!",
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data || err.message,
        message: "Erro ao atualizar item",
      };
    }
  };

  return {
    updateItem,
  };
}
