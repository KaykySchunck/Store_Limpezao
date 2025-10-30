import { useState } from "react";
import { getCategoryByNameService } from "@/services/category.service";

export function useGetCategoryByName() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [category, setCategory] = useState<any | null>(null);

  const fetchCategory = async (fk_idstore: string, name: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getCategoryByNameService(fk_idstore, name);
      setCategory(result.category);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchCategory, category, loading, error };
}
