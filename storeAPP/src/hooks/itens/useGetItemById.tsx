import { getItemByIdService } from "@/services/itens.service";
import { useState, useEffect } from "react";

export function useGetItemById(id: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getItemByIdService(id);
        setItem(result.item || null);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setError(err);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  return { item, loading, error };
}
