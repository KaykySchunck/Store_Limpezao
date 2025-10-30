import { EditItemDetailComponent } from "./edit-itens.component";
import { useStoreContext } from "@/modules/contexts/store-context/store-context";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { useGetItemById } from "@/hooks/itens/useGetItemById";
import { URL_INVENTORY } from "@/constants/urls";
import { useRouter } from "next/navigation";
import { Category } from "@/@types/category";

type inProps = {
  itemId: string;
  setCurrentStep: (step: string) => void;
  categories: Category[];
};

export default function EditItemDetailContainer(Props: inProps) {
  const { itemId, setCurrentStep, categories } = Props;
  const { item } = useGetItemById(itemId);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <EditItemDetailComponent
      item={item}
      categories={categories}
      setCurrentStep={setCurrentStep}
    />
  );
}
