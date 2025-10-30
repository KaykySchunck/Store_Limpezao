import { Request, Response } from "express";

import { AppError } from "../../../error/error";
import { CreateCategorieDTO } from "../dto/categories.dto";
import { CreateCategorieUseCase } from "../use-cases/create-categorie.use-case";
import { GetCategoriesUseCase } from "../use-cases/get-categories.use-case";
import { DeleteCategorieUseCase } from "../use-cases/delete-categorie.use-case";
import { UpdateCategorieUseCase } from "../use-cases/update-categorie.use-case";
import { GetCategoryByIdUseCase } from "../use-cases/get-category-by-id.use-case";
import { GetCategoryByNameUseCase } from "../use-cases/get-category-by-name.use-case";

export class CategorieController {
  static async createCategorie(req: Request, res: Response): Promise<Response> {
    try {
      const { name, fk_idstore }: CreateCategorieDTO = req.body;

      if (!name || !fk_idstore) {
        return res.status(400).json({ message: "Esta faltando dados!" });
      }

      const newCategorie = await CreateCategorieUseCase.execute({
        name,
        fk_idstore,
      });

      return res.status(201).json({
        message: "Categoria criada com sucesso",
        categorie: {
          id: newCategorie.id,
          name: newCategorie.name,
          fk_idstore: newCategorie.fk_idstore,
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

  static async updateCategorie(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!id || !name) {
        return res.status(400).json({ message: "ID ou nome não fornecidos!" });
      }

      const updatedCategorie = await UpdateCategorieUseCase.execute({
        id,
        name,
      });

      return res.status(200).json({
        message: "Categoria atualizada com sucesso",
        categorie: {
          id: updatedCategorie.id,
          name: updatedCategorie.name,
          fk_idstore: updatedCategorie.fk_idstore,
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

  static async getCategories(req: Request, res: Response): Promise<Response> {
    try {
      const { fk_idstore } = req.query;

      if (!fk_idstore) {
        return res
          .status(400)
          .json({ message: "ID do comerciante é obrigatório!" });
      }

      const categories = await GetCategoriesUseCase.execute(
        fk_idstore as string
      );

      return res.status(200).json({
        message: "Categorias encontradas com sucesso",
        categories: categories,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async deleteCategorie(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ message: "ID da categoria é obrigatório!" });
      }

      await DeleteCategorieUseCase.execute(id);

      return res.status(200).json({
        message: "Categoria deletada com sucesso",
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error(`[ERROR]: ${String(error)}`);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getCategoryById(req: Request, res: Response): Promise<Response> {
    try {
      const { fk_idstore } = req.query;
      const { categoryId } = req.params;

      if (!fk_idstore) {
        return res
          .status(400)
          .json({ message: "ID do comerciante é obrigatório!" });
      }

      if (!categoryId) {
        return res
          .status(400)
          .json({ message: "ID da categoria é obrigatório!" });
      }

      const category = await GetCategoryByIdUseCase.execute(
        fk_idstore as string,
        categoryId as string
      );

      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      return res.status(200).json({
        message: "Categoria encontrada com sucesso",
        category: category,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getCategoryByName(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { fk_idstore } = req.query;
      const { name } = req.params;

      if (!fk_idstore) {
        return res
          .status(400)
          .json({ message: "ID do comerciante é obrigatório!" });
      }

      if (!name) {
        return res
          .status(400)
          .json({ message: "ID da categoria é obrigatório!" });
      }

      const category = await GetCategoryByNameUseCase.execute(
        fk_idstore as string,
        name as string
      );

      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      return res.status(200).json({
        message: "Categoria encontrada com sucesso",
        category: category,
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
