import { Store } from "@/@types/store";
import { Button, Input } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { URL_DOMAIN } from "@/constants/urls";
import { useFormStorage } from "@/modules/form";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { Copy } from "lucide-react"; // Assuming you're using lucide-react for icons
import toast from "react-hot-toast";

type InProps = {
  submit: (data: Store) => void;
  store: Store;
  onClose: () => void;
};

export default function EditStoreComponent(props: InProps) {
  const { submit, store, onClose } = props;
  const [copied, setCopied] = useState(false);

  const { handleSubmit, control, watch } = useFormStorage<Store>({
    instance: "edit-store-form",
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: store.name,
      url: store.url,
      merchantId: store.merchantId,
      whatsApp: store.whatsApp,
    },
  });

  // Get the current URL value from the form
  const urlValue = watch("url");

  // Function to copy the full URL to clipboard
  const copyFullUrl = () => {
    const fullUrl = `${URL_DOMAIN}/customer/${urlValue}/store`;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setCopied(true);
        toast.success("URL copiada para a área de transferência!");
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((err) => {
        toast.error("Falha ao copiar URL!");
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-md bg-white border border-gray-200 shadow-lg">
          <DialogTitle className="text-gray-900 font-semibold">Editar</DialogTitle>
          <div className="bg-white">
            <p className="text-muted-foreground text-sm mb-4">
              Adicione sua loja registrando todas as informações a baixo
            </p>
            <form onSubmit={handleSubmit(submit)} className="mt-2">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "O nome da loja é obrigatório.",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    label="Nome da loja"
                    placeholder="Digite o nome da loja"
                  />
                )}
              />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md font-medium">
                    {URL_DOMAIN}/customer
                  </div>
                  <div className="flex-1">
                    <Controller
                      name="url"
                      control={control}
                      rules={{
                        required: "A URL da loja é obrigatória.",
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="url"
                          type="text"
                          label="URL da loja"
                          placeholder="Digite a URL"
                        />
                      )}
                    />
                  </div>
                  <div className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md font-medium">
                    /store
                  </div>
                </div>
                <div
                  className="flex gap-2 mb-4 cursor-pointer"
                  onClick={copyFullUrl}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? "Copiado!" : "Copiar URL completa"}
                </div>
              </div>

              <Controller
                name="whatsApp"
                control={control}
                rules={{
                  required: "O número do WhatsApp é obrigatório.",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="whatsapp"
                    type="text"
                    label="Número do WhatsApp"
                    placeholder="Digite o número do WhatsApp"
                  />
                )}
              />
              <Button type="submit" variant="default">
                Editar Loja
              </Button>
            </form>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
