import { useState } from "react";
import { getItemByNameService } from "@/services/itens.service";

export function useGetItemByName() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<any>(null);

  const fetchItem = async (merchantId: string, name: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getItemByNameService(merchantId, name);
      setItem(result.itens || null);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Erro ao buscar item."
      );
    } finally {
      setLoading(false);
    }
  };

  return { fetchItem, item, loading, error };
}
