import { useState } from "react";
import { deleteCategoryService } from "@/services/category.service";

export function useDeleteCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteCategory = async (categoryId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await deleteCategoryService(categoryId);
      setLoading(false);
      setSuccess(true);
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  };

  return { deleteCategory, loading, error, success };
}
