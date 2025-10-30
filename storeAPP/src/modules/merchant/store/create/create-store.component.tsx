import { CreateStore } from "@/@types/store";
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

type inProps = {
  submit: (data: Partial<CreateStore>) => void;
  setIsModalOpenCreate: (isBoolean: boolean) => void;
};

export default function CreateStoreComponent(Props: inProps) {
  const { submit, setIsModalOpenCreate } = Props;

  const { handleSubmit, control } = useFormStorage<CreateStore>({
    instance: "create-store-form",
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  return (
    <Dialog open onOpenChange={() => setIsModalOpenCreate(false)}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-lg bg-white border border-gray-200 shadow-lg">
          <DialogTitle className="text-gray-900 font-semibold">Cadastrar</DialogTitle>
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
                Cadastrar Loja
              </Button>
            </form>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
