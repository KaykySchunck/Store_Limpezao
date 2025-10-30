import { useState, useEffect } from "react";
import AddImagesItemComponent from "./AddImagesItem.component";
import {
  createImageItemService,
  getImagesByItemIdService,
  deleteImageItemService, // Importe o serviço de deletar
} from "@/services/images_itens.service";

export default function AddImagesItemContainer({
  isModalAddImages,
  selectedItemId,
}: any) {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<any[]>([]);

  // Função para buscar as imagens ao iniciar o componente
  useEffect(() => {
    const fetchImages = async () => {
      if (selectedItemId) {
        try {
          const response = await getImagesByItemIdService(selectedItemId);
          setImages(response.data.data);
          console.log("Imagens carregadas:", response.data.data);
        } catch (err) {
          console.error("Erro ao buscar imagens:", err);
        }
      }
    };

    fetchImages();
  }, [selectedItemId]);

  // Função para adicionar uma nova imagem
  async function handleSubmit() {
    if (!file || !selectedItemId) {
      alert("Por favor, selecione um arquivo e insira o ID do item!");
      return;
    }

    // Criar FormData com o arquivo e o ID do item
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fk_id_item", selectedItemId);

    try {
      const response = await createImageItemService(formData);
      console.log("Imagem criada com sucesso:", response);
      alert("Imagem adicionada com sucesso!");
      isModalAddImages(false);

      // Atualiza a lista de imagens após adicionar uma nova
      const updatedImages = await getImagesByItemIdService(selectedItemId);
      setImages(updatedImages.data.data);
    } catch (err) {
      console.error("Erro ao adicionar imagem:", err);
    }
  }

  // Função para deletar uma imagem
  async function handleDeleteImage(imageId: string) {
    console.log(imageId);
    try {
      const response = await deleteImageItemService(imageId);
      console.log("Imagem deletada com sucesso:", response.data);

      // Atualiza a lista de imagens após deletar
      const updatedImages = await getImagesByItemIdService(selectedItemId);
      setImages(updatedImages.data.data);
    } catch (err) {
      console.error("Erro ao deletar a imagem:", err);
    }
  }

  return (
    <AddImagesItemComponent
      isModalAddImages={isModalAddImages}
      file={file}
      setFile={setFile}
      handleSubmit={handleSubmit}
      images={images}
      handleDeleteImage={handleDeleteImage} // Passa a função de deletar como prop
    />
  );
}
