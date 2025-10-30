import { Button, Input } from "@/components/ui";

export interface SearchItemProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: () => void;
}

export default function SearchItemComponent(props: SearchItemProps) {
  const { searchTerm, setSearchTerm, onSearch } = props;

  return (
    <div className="flex gap-4">
      <Input
        placeholder="Pesquise por item"
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
