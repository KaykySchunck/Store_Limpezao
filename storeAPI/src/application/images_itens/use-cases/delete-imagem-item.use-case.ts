import ImageItens from "../../../models/images_itens.model";
import { S3Controller } from "../../s3/controller/s3.cotroller";

export class DeleteImageItemUseCase {
  static async execute(imageId: string) {
    if (!imageId) {
      throw new Error("No imageId provided");
    }

    try {
      // Busca a imagem no banco de dados pelo ID
      const image = await ImageItens.findByPk(imageId);

      if (!image) {
        throw new Error("Image not found");
      }

      // Simula o objeto `req` do Express para passar a chave do S3
      const req = {
        params: {
          url: image.key, // A chave do S3 está armazenada no campo `key` do banco de dados
        },
      };

      // Simula o objeto `res` do Express para capturar a resposta do S3Controller
      let s3Response: any;
      const res = {
        status(code: number) {
          console.log(`Status code: ${code}`);
          return this;
        },
        json(data: any) {
          console.log("Response data:", data);
          s3Response = data; // Armazena a resposta do S3Controller
          return data;
        },
      };

      // Chama o método do S3Controller para deletar a imagem no S3
      await S3Controller.DeleteImage(req as any, res as any);

      // Verifica se a exclusão no S3 foi bem-sucedida
      if (!s3Response || s3Response.message !== "File deleted successfully") {
        throw new Error("Failed to delete image from S3");
      }

      // Deleta o registro da imagem no banco de dados
      await image.destroy();

      return { success: true, message: "Image deleted successfully" };
    } catch (error) {
      console.error("Error in DeleteImageItemUseCase:", error);
      throw new Error("Failed to delete image item");
    }
  }
}
