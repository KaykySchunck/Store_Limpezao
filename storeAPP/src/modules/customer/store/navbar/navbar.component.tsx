import { Category } from "@/@types/category";
import { storeCustomizationsDivided } from "@/@types/store";

type Props = {
  customizations: storeCustomizationsDivided["navbar"];
  categories: Category[];
  selectedCategoryId: string | null;
  onCategoryClick: (id: string) => void;
};

export default function NavbarComponent({
  customizations,
  categories,
  selectedCategoryId,
  onCategoryClick,
}: Props) {
  return (
    <div
      style={{
        backgroundColor: customizations.backgroundColor,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      className="cursor-pointer overflow-auto w-full py-4 px-6 transition-all duration-300 ease-in-out"
    >
      <h1
        style={{ color: customizations.colorText }}
        className="text-3xl font-semibold drop-shadow-lg mb-4"
      >
        Categorias
      </h1>
      <ul className="flex gap-6 whitespace-nowrap">
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            style={{
              color: customizations.colorText,
              fontWeight:
                selectedCategoryId === category.id ? "bold" : "normal",
              textDecoration:
                selectedCategoryId === category.id ? "underline" : "none",
            }}
            className="text-lg font-medium cursor-pointer"
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
