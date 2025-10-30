import { useStoreContext } from "@/modules/contexts/store-context/store-context";
import CategoriesPageComponent from "./categories-page-component";
import { useGetCategories } from "@/hooks/categories/useGetCategories";

export default function CategoriesPageContainer() {
  const { store } = useStoreContext();
  const storeId = store?.id ?? "";
  const { categories, reloadCategories, setCategories } =
    useGetCategories(storeId);

  return store ? (
    <CategoriesPageComponent
      categories={categories}
      setCategories={setCategories}
      store={store}
      reloadCategories={reloadCategories}
    />
  ) : null;
}
