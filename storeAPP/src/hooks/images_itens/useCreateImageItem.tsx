import { useState } from "react";
import { createImageItemService } from "@/services/images_itens.service";
import AddImagesItemComponent from "@/modules/merchant/itens/AddImagesItem/AddImagesItem.component";

export default function AddImagesItemContainer({
  isModalAddImages,
  selectedItemId,
}: any) {
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit() {
    if (!file || !selectedItemId) {
      alert("Por favor, selecione um arquivo e insira o ID do item!");
      return;
    }

    // Verifique o conteúdo do arquivo e do ID
    console.log("Arquivo selecionado:", file);
    console.log("ID do item selecionado:", selectedItemId);

    try {
      // Criar FormData com o arquivo e o ID do item
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fk_id_item", selectedItemId);

      const response = await createImageItemService(formData);
      console.log("Imagem criada com sucesso:", response);
      isModalAddImages(false); // Fecha o modal após o sucesso
    } catch (err) {
      console.error("Erro ao adicionar imagem:", err);
      alert(
        "Erro ao adicionar imagem. Verifique o console para mais detalhes."
      );
    }
  }

  return (
    <AddImagesItemComponent
      isModalAddImages={isModalAddImages}
      file={file}
      setFile={setFile}
      handleSubmit={handleSubmit}
    />
  );
}
