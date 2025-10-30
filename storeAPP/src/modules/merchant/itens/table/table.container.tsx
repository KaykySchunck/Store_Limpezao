import { useGetItens } from "@/hooks/itens/useGetItens";
import { ItensTableComponent } from "./table.component";
import { useStoreContext } from "../../../contexts/store-context/store-context";
import { Item } from "@/@types/itens";

type Props = {
  itens: Item[];
  reloadItens: () => void;
  setIsModalAddImages: (Boolean: boolean) => void;
  onItemSelect: any; // Nova prop para capturar o ID do item selecionado
};

export function ItensTableContainer(inProps: Props) {
  const { itens, reloadItens, setIsModalAddImages, onItemSelect } = inProps;
  return (
    <ItensTableComponent
      itens={itens}
      reloadItens={reloadItens}
      setIsModalAddImages={setIsModalAddImages}
      onItemSelect={onItemSelect} // Passando a função para capturar o ID do item selecionado
    />
  );
}
