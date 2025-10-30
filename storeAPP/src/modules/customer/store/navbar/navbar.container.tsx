import NavbarComponent from "./navbar.component";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { useCatalogContext } from "@/modules/contexts/store-context/catalog-context";
import { useStoreCustomizationsContext } from "@/modules/contexts/store-context/store-customer-customizations-context";

type Props = {
  storeId: string;
};

export default function NavbarContainer({ storeId }: Props) {
  const { navbarInfo } = useStoreCustomizationsContext();

  const { selectedCategoryId, setSelectedCategoryId } = useCatalogContext();

  const { categories } = useGetCategories(storeId);

  const handleCategoryClick = (id: string) => {
    setSelectedCategoryId(id);
  };

  return (
    <NavbarComponent
      categories={categories}
      customizations={navbarInfo}
      selectedCategoryId={selectedCategoryId}
      onCategoryClick={handleCategoryClick}
    />
  );
}
