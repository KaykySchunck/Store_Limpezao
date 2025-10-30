import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

type InProps = {
  handleCloseModals: () => void;
  children: React.ReactNode;
};

export default function EditItemComponent({
  handleCloseModals,
  children,
}: InProps) {
  return (
    <Dialog open onOpenChange={handleCloseModals}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-md bg-white border border-gray-200 shadow-lg">
          <DialogTitle>Cadastrar</DialogTitle>
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
