import { CreateCategoryPayload } from "@/@types/category";
import { createCategoryService } from "@/services/category.service";

export function useCreateCategory() {
  const createCategory = async (categoryData: CreateCategoryPayload) => {
    try {
      const result = await createCategoryService(categoryData);
      return { success: true, result };
    } catch (err: any) {
      return { success: false, error: err };
    }
  };

  return { createCategory };
}
