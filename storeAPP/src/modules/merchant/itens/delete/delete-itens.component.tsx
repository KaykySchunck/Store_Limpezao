import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { WarningCircle } from "@phosphor-icons/react";

type DeleteItensProps = {
  handleDeleteItem: () => void;
  handleCloseModals: () => void;
};

export default function DeleteItensComponent({
  handleDeleteItem,
  handleCloseModals,
}: DeleteItensProps) {
  return (
    <Dialog open onOpenChange={handleCloseModals}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-md flex flex-col text-center gap-1 bg-white border border-gray-200 shadow-lg">
          <WarningCircle className="h-16 w-16 mb-7 mt-6 mx-auto text-red-600" />
          <DialogTitle className="text-2xl">
            Deseja realmente fazer a exclusão desse Item?
          </DialogTitle>
          <div>
            <p className="text-gray-500 text-sm mb-2">
              Essa ação não poderá ser desfeita após a conclusão.
            </p>
            <Button onClick={handleDeleteItem} variant="destructive">
              Sim, Quero excluir
            </Button>
            <Button
              onClick={handleDeleteItem}
              variant="outline"
              className="mt-2"
            >
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
