import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { WarningCircle } from "@phosphor-icons/react/dist/ssr";

type DeleteCategoryProps = {
  handleDeleteCategory: () => void;
  closeModals: () => void;
};

export default function DeleteCategoryComponent({
  handleDeleteCategory,
  closeModals,
}: DeleteCategoryProps) {
  return (
    <Dialog open onOpenChange={closeModals}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-md flex flex-col text-center gap-1 bg-white border border-gray-200 shadow-lg">
          <WarningCircle className="h-16 w-16 mb-7 mt-6 mx-auto text-red-600" />
          <DialogTitle className="text-2xl">
            Deseja realmente fazer a exclusão dessa categoria?
          </DialogTitle>
          <p className="text-gray-500 text-sm mb-2">
            Essa ação não poderá ser desfeita após a conclusão.
          </p>
          <Button onClick={handleDeleteCategory} variant="destructive">
            Sim, Quero excluir
          </Button>

          <Button variant="outline" className="mt-2" onClick={closeModals}>
            Cancelar
          </Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
