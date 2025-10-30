import { Category } from "@/@types/category";
import { Button, Input } from "@/components/ui";

export interface SearchCategoriesProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: () => void;
  ToggleModalCreate: (boolean: Boolean) => void;
}

export default function SearchCategoriesComponent(
  props: SearchCategoriesProps
) {
  const { searchTerm, setSearchTerm, onSearch, ToggleModalCreate } = props;

  return (
    <>
      <div className="flex gap-4">
        <Input
          placeholder="Pesquise por categoria"
          className="min-w-[355px] border-gray-300"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
        />
        <div>
          <Button onClick={onSearch}>Pesquisar</Button>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <Button onClick={() => ToggleModalCreate(true)}>
          Adicionar categoria
        </Button>
      </div>
    </>
  );
}
