import { Button, Input } from "@/components/ui";

interface SearchStoreComponentProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: () => void;
}

export default function SearchStoreComponent({
  searchTerm,
  setSearchTerm,
  onSearch,
}: SearchStoreComponentProps) {
  return (
    <div className="flex gap-4">
      <Input
        placeholder="Pesquise por Loja"
        className="min-w-[355px] border-gray-300"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
      />
      <div>
        <Button onClick={onSearch}>Pesquisar</Button>
      </div>
    </div>
  );
}
