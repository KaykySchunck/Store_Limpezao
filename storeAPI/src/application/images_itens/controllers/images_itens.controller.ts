import { Request, Response } from "express";
import { AppError } from "../../../error/error";
import { CreateImageItemUseCase } from "../use-cases/create-Images-itens.use-case";
import { GetImageItemUseCaseByFkId } from "../use-cases/get-Images-itens-by-fk-id.use-case";
import { DeleteImageItemUseCase } from "../use-cases/delete-imagem-item.use-case";

export class ImagesItensController {
  static async createImageItem(req: Request, res: Response) {
    try {
      const file = req.file;
      const { fk_id_item } = req.body;

      if (!file || !fk_id_item) {
        return res.status(400).json({ message: "Faltando dados necessários!" });
      }

      const newImageItem = await CreateImageItemUseCase.execute({
        file,
        fk_id_item,
      });

      return res.status(201).json({
        message: "Imagem criada com sucesso",
        data: newImageItem,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getImages(req: Request, res: Response) {
    try {
      const { fk_id_item } = req.query;

      if (!fk_id_item) {
        return res.status(400).json({ message: "Faltando fk_id_item!" });
      }

      const images = await GetImageItemUseCaseByFkId.execute(
        fk_id_item as string
      );

      return res.status(200).json({
        message: "Imagens recuperadas com sucesso",
        data: images,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async deleteImage(req: Request, res: Response) {
    try {
      const { imageId } = req.params;

      if (!imageId) {
        return res.status(400).json({ message: "Faltando imageId!" });
      }

      // Executa o use case para deletar a imagem
      const result = await DeleteImageItemUseCase.execute(imageId);

      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
