import { deleteItemService } from "@/services/itens.service";
import { useState } from "react";

export function useDeleteItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteItem = async (itemId: string, fk_idcategory?: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await deleteItemService(itemId, fk_idcategory);
      setLoading(false);
      setSuccess(true);
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  };

  return { deleteItem, loading, error, success };
}
