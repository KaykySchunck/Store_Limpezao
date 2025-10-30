import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { URL_DELETE, URL_DETAIL, URL_EDIT, URL_ITENS } from "@/constants/urls";
import { DotsThree } from "@phosphor-icons/react";
import Link from "next/link";

type ItensActionsComponentProps = {
  itemId: string;
  onEdit: (isOpen: boolean, itemId?: string) => void;
  onDelete: (isOpen: boolean, itemId?: string) => void;
};

export function ItensActionsComponent({
  itemId,
  onEdit,
  onDelete,
}: ItensActionsComponentProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsThree size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onClick={(e: any) => e.stopPropagation()}
      >
        <DropdownMenuItem onClick={() => onEdit(true, itemId)}>
          Editar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete(true, itemId)}>
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
