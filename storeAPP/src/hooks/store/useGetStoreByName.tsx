import { useState } from "react";
import { getStoreByNameService } from "@/services/store.service";
import toast from "react-hot-toast";

export function useGetStoreByName() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [store, setStore] = useState<any | null>(null);

  const fetchStore = async (merchantId: string, name: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getStoreByNameService(merchantId, name);
      setStore(result.store || null);
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchStore, store, loading, error };
}
