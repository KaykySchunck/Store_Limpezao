import { Separator } from "@/components/ui/Separator";
import { CategoriesItensContainer } from "../categories-itens/categories-itens.container";
import SearchCategoriesContainer from "../search/search-categoires.container";
import { Store } from "@/@types/store";
import { Category } from "@/@types/category";

type Props = {
  categories: Category[];
  store?: Store | undefined;
  reloadCategories: () => void;
  setCategories: any;
};

export default function CategoriesPageComponent({
  categories,
  store,
  reloadCategories,
  setCategories,
}: Props) {
  return (
    <div className="flex flex-col">
      <h1 className="text-gray-800 font-semibold text-2xl">categoria</h1>
      <div style={{ alignItems: "baseline" }} className="flex justify-between">
        <SearchCategoriesContainer
          setCategories={setCategories}
          store={store as Store}
          reloadCategories={reloadCategories}
        />
      </div>
      <Separator className="my-4" />
      <CategoriesItensContainer
        categories={categories}
        store={store as Store}
        reloadCategories={reloadCategories}
      />
    </div>
  );
}
