import { useState, useEffect } from "react";
import { getCategoryByIdService } from "@/services/category.service";

export function useGetCategoryById(fk_idstore: string, categoryId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [category, setCategory] = useState<any | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!fk_idstore || !categoryId) {
        setError("Parâmetros inválidos");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const result = await getCategoryByIdService(fk_idstore, categoryId);
        
        // Verifica se o resultado é válido
        if (result && result.category) {
          setCategory(result.category);
        } else {
          setError("Categoria não encontrada");
          setCategory(null);
        }
      } catch (err: any) {
        console.error("Erro ao buscar categoria:", err);
        setError(err?.message || "Erro ao buscar categoria");
        setCategory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [fk_idstore, categoryId]);

  return { category, loading, error };
}
