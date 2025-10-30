import { Request, Response } from "express";

import { AppError } from "../../../error/error";
import { CreateItemDTO, ItemDTO } from "../dto/itens.dto";
import { CreateItemUseCase } from "../use-cases/create-itens.use-case";
import { GetItemsUseCase } from "../use-cases/get-itens.use-case";
import { DeleteItemUseCase } from "../use-cases/delete-itens.use-case";
import { GetItemByIdUseCase } from "../use-cases/get-item-by-id.use-case";
import { UpdateItemUseCase } from "../use-cases/update-item.use-case";
import { GetItemByNameUseCase } from "../use-cases/get-item-by-name.use-case";
import { GetItemsWithImagesUseCase } from "../use-cases/get-itens-with-images.use-case";
import { GetItemWithImagesByIdUseCase } from "../use-cases/get-itens-with-images-by-id.use-case";

export class ItemController {
  static async createItem(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name,
        description,
        stock,
        value,
        fk_idstore,
        fk_idcategory,
      }: CreateItemDTO = req.body;

      if (
        !name ||
        !description ||
        stock === undefined ||
        value === undefined ||
        !fk_idstore ||
        !fk_idcategory
      ) {
        return res.status(400).json({ message: "Faltando dados necessários!" });
      }

      const newItem = await CreateItemUseCase.execute({
        name,
        description,
        stock,
        value,
        fk_idstore,
        fk_idcategory,
      });

      return res.status(201).json({
        message: "Item criado com sucesso",
        item: {
          id: newItem.id,
          name: newItem.name,
          description: newItem.description,
          stock: newItem.stock,
          value: newItem.value,
          fk_idcategory: newItem.fk_idcategory,
        },
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async updateItem(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        stock,
        value,
        fk_idstore,
        fk_idcategory,
      }: ItemDTO = req.body;

      if (!id) {
        return res.status(400).json({ message: "ID do item é obrigatório!" });
      }

      const updatedItem = await UpdateItemUseCase.execute(id, {
        name,
        description,
        stock,
        value,
        fk_idstore,
        fk_idcategory,
      });

      return res.status(200).json({
        message: "Item atualizado com sucesso",
        item: {
          id: updatedItem.id,
          name: updatedItem.name,
          description: updatedItem.description,
          stock: updatedItem.stock,
          value: updatedItem.value,
          fk_idcategory: updatedItem.fk_idcategory,
        },
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getItens(req: Request, res: Response): Promise<Response> {
    try {
      const { fk_idstore, fk_idcategory } = req.query;

      if (!fk_idstore) {
        return res.status(400).json({
          message: "ID do comerciante é obrigatório!",
        });
      }

      const items = await GetItemsUseCase.execute(
        fk_idstore as string,
        fk_idcategory ? (fk_idcategory as string) : undefined
      );

      return res.status(200).json({
        message: "Itens encontrados com sucesso",
        itens: items,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getItensAndImages(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { fk_idstore, fk_idcategory } = req.query;

      if (!fk_idstore) {
        return res.status(400).json({
          message: "ID do comerciante é obrigatório!",
        });
      }

      // Chama o useCase para buscar os itens com as imagens
      const itensWithImages = await GetItemsWithImagesUseCase.execute(
        fk_idstore as string,
        fk_idcategory ? (fk_idcategory as string) : undefined
      );

      return res.status(200).json({
        message: "Itens e imagens encontrados com sucesso",
        itensWithImages: itensWithImages,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getItemWithImagesById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID do item é obrigatório." });
    }

    try {
      const itemWithImages = await GetItemWithImagesByIdUseCase.execute(id);

      if (!itemWithImages) {
        return res.status(404).json({ message: "Item não encontrado." });
      }

      return res.status(200).json({
        message: "Item e imagens encontrados com sucesso.",
        itemWithImages,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  static async deleteItem(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { fk_idcategory } = req.query;
      if (!id) {
        return res.status(400).json({ message: "ID do item é obrigatório!" });
      }

      await DeleteItemUseCase.execute(id, (fk_idcategory as string) || "");

      return res.status(200).json({
        message: "Item deletado com sucesso",
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error(`[ERROR]: ${error}`);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getItemById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          message: "ID do item é obrigatório!",
        });
      }

      const item = await GetItemByIdUseCase.execute(id);

      return res.status(200).json({
        message: "Item encontrado com sucesso",
        item,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getItemByName(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.params;
      const { fk_idstore } = req.query;

      if (!name) {
        return res.status(400).json({
          message: "O nome do item é obrigatório!",
        });
      }

      if (!fk_idstore) {
        return res.status(400).json({
          message: "O ID da loja (fk_idstore) é obrigatório!",
        });
      }

      const itens = await GetItemByNameUseCase.execute(
        fk_idstore as string,
        name
      );

      return res.status(200).json({
        message: "Itens encontrados com sucesso",
        itens,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
