import { Button } from "@/components/ui";
import SearchItemContainer from "../search/search-item.contaiener";
import { ItensTableContainer } from "../table/table.container";
import { Item } from "@/@types/itens";

type inProps = {
  setIsModalOpenCreate: (Boolean: boolean) => void;
  setIsModalAddImages: (Boolean: boolean) => void;
  itens: Item[];
  reloadItens: () => void;
  setItens: (newItens: Item[]) => void;
  setSelectedItemId: (id: string | null) => void; // Nova prop para definir o ID do item selecionado
};

export default function ItensPageComponent(Props: inProps) {
  const {
    setIsModalOpenCreate,
    itens,
    reloadItens,
    setItens,
    setIsModalAddImages,
    setSelectedItemId,
  } = Props;

  const handleItemSelection = (itemId: string) => {
    setSelectedItemId(itemId); // Define o ID do item selecionado
    setIsModalAddImages(true); // Abre o modal de adicionar imagens
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-gray-800 font-semibold text-2xl">Itens</h1>
      <div className="flex items-start my-2 justify-between">
        <SearchItemContainer setItens={setItens} />
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsModalOpenCreate(true)}>
            Adicionar item
          </Button>
        </div>
      </div>
      <ItensTableContainer
        itens={itens}
        reloadItens={reloadItens}
        setIsModalAddImages={setIsModalAddImages}
        onItemSelect={handleItemSelection} // Passando a função para capturar o ID do item selecionado
      />
    </div>
  );
}
