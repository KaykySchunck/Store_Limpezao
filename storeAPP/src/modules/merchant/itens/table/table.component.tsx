import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/modules/formatters/format-currency";
import { ItensActionsContainer } from "./actions/table-actions.container";
import { Item } from "@/@types/itens";
import { Button } from "@/components/ui";

interface ItensTableComponentProps {
  reloadItens: () => void;
  itens: Item[];
  setIsModalAddImages: (Boolean: boolean) => void;
  onItemSelect: any; // Nova prop para capturar o ID do item selecionado
}

export function ItensTableComponent({
  itens,
  reloadItens,
  setIsModalAddImages,
  onItemSelect,
}: ItensTableComponentProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Estoque</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {itens.length > 0 ? (
          itens.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{formatCurrency(item.stock)}</TableCell>
              <TableCell>{formatCurrency(item.value)}</TableCell>
              <TableCell className="w-10">
                <div className="flex gap-4">
                  <div onClick={() => onItemSelect(item.id)}>
                    <Button>Adicionar Fotos</Button>
                  </div>
                  <span className="border-2 border-blue-500 rounded-lg p-1 flex justify-center bg-red-600 shadow-sm">
                    <ItensActionsContainer
                      itemId={item.id}
                      reloadItens={reloadItens}
                    />
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Nenhum item encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
