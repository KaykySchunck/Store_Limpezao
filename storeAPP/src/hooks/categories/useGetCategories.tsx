import { useState, useEffect } from "react";
import { getCategoriesService } from "@/services/category.service";

export function useGetCategories(fk_idstore: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const reloadCategories = () => setReloadTrigger((prev) => prev + 1);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getCategoriesService(fk_idstore);
        setCategories(result.categories);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (fk_idstore) {
      fetchCategories();
    }
  }, [fk_idstore, reloadTrigger]);

  return { categories, setCategories, error, reloadCategories };
}
