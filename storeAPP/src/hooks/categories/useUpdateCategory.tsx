import { updateCategoryService } from "@/services/category.service";

export function useUpdateCategory() {
  const updateCategory = async (id: string, name: string) => {
    try {
      const result = await updateCategoryService(id, name);
      return { success: true, result };
    } catch (err: any) {
      return { success: false, error: err };
    }
  };

  return { updateCategory };
}
