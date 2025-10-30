import { Category } from "@/@types/category";
import { Store } from "@/@types/store";
import { Button } from "@/components/ui";
import { URL_CATEGORIES, URL_DELETE, URL_EDIT } from "@/constants/urls";
import Link from "next/link";

type Props = {
  categories: Category[];
  store?: Store | undefined;
  ToggleModalEdit: (isOpen: boolean, categoryId?: string) => void;
  ToggleModalDelete: (isOpen: boolean, categoryId: string) => void;
};

export function CategoriesItemComponent({
  categories,
  store,
  ToggleModalEdit,
  ToggleModalDelete,
}: Props) {
  return (
    <div className="m-4 rounded-lg">
      {categories && categories.length > 0 ? (
        <div className="flex flex-col gap-4 mt-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-medium text-lg">
                  {category.name}
                </span>
                <div className="flex gap-4">
                  <Button
                    onClick={() => ToggleModalEdit(true, category.id)}
                    variant="outline"
                    className="bg-white"
                  >
                    Editar
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => ToggleModalDelete(true, category.id)}
                  >
                    Deletar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-10">
          <p className="text-gray-600 text-lg font-medium">
            Nenhuma categoria encontrada.
          </p>
        </div>
      )}
    </div>
  );
}
