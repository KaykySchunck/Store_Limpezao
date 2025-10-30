import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AddImagesItemComponent({
  isModalAddImages,
  setFile,
  handleSubmit,
  images,
  handleDeleteImage, // Recebe a função de deletar como prop
}: any) {
  return (
    <Dialog open onOpenChange={() => isModalAddImages(false)}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-md bg-white border border-gray-200 shadow-lg">
          <DialogTitle>Adicionar fotos ao item</DialogTitle>
          <div>
            <div>
              <input
                type="file"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                className="mb-4"
              />
              <Button onClick={handleSubmit}>Adicionar</Button>
            </div>

            {/* Exibe as imagens */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Imagens do Item</h3>
              {images && images.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image: any) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.url}
                        alt={image.key}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        style={{ marginTop: "12px" }}
                        onClick={() => handleDeleteImage(image.id)} // Chama a função de deletar
                      >
                        Deletar
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Nenhuma imagem encontrada.</p>
              )}
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
