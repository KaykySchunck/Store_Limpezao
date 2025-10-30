import { Request, Response } from "express";

import { AppError } from "../../../error/error";
import { CreateStoreDTO } from "../dto/store.dto";
import { CreateStoreUseCase } from "../use-cases/create-store.use-case";
import { GetStoresByMerchantUseCase } from "../use-cases/get-stores-merchantId.use-case";
import { GetStoreByUrlUseCase } from "../use-cases/get-store-by-url.use-case";
import { GetStoreByIdUseCase } from "../use-cases/get-store-by-id.use-case";
import { UpdateStoreUseCase } from "../use-cases/update-store.use-case";
import { GetStoreByNameUseCase } from "../use-cases/get-store-by-name.use-case";
import { StoreCustomizationsController } from "./store-customizations.controller";

export class StoreController {
  static async createStore(req: Request, res: Response): Promise<Response> {
    try {
      const { name, url, whatsApp, merchantId }: CreateStoreDTO = req.body;

      const newStore = await CreateStoreUseCase.execute({
        name,
        url,
        whatsApp,
        merchantId,
      });

      return res.status(201).json({
        message: "Loja criada com sucesso",
        store: {
          id: newStore.id,
          name: newStore.name,
          merchantId: newStore.merchantId,
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro no controlador de criação de loja:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async updateStore(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, url, whatsApp, merchantId }: Partial<CreateStoreDTO> =
        req.body;

      const updatedStore = await UpdateStoreUseCase.execute({
        id,
        name,
        url,
        whatsApp,
        merchantId,
      });

      return res.status(200).json({
        message: "Loja atualizada com sucesso",
        store: {
          id: updatedStore.id,
          name: updatedStore.name,
          merchantId: updatedStore.merchantId,
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro no controlador de atualização de loja:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getStoresByMerchant(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { merchantId } = req.params;

      if (!merchantId) {
        throw new AppError("merchantId é obrigatório", 400);
      }

      const stores = await GetStoresByMerchantUseCase.execute(merchantId);

      return res.status(200).json({
        message: "Lojas encontradas com sucesso",
        stores,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro ao buscar lojas:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getStoreByUrl(req: Request, res: Response): Promise<Response> {
    try {
      const { url } = req.params;

      if (!url) {
        throw new AppError("URL da loja é obrigatória", 400);
      }

      const store = await GetStoreByUrlUseCase.execute(url);

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      return res.status(200).json({
        message: "Loja encontrada com sucesso",
        store,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro ao buscar loja por URL:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getStoreById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        throw new AppError("ID é obrigatório", 400);
      }

      const store = await GetStoreByIdUseCase.execute(id);

      return res.status(200).json({
        message: "Loja encontrada com sucesso",
        store,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro ao buscar lojas:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getStoreByName(req: Request, res: Response): Promise<Response> {
    try {
      const { merchantId } = req.params;
      const { name } = req.query;

      if (!name || !merchantId) {
        throw new AppError("Nome e merchantId são obrigatórios", 400);
      }

      const store = await GetStoreByNameUseCase.execute(
        merchantId,
        name as string
      );

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      console.log(store);

      return res.status(200).json({
        message: "Loja encontrada com sucesso",
        store,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro ao buscar loja pelo nome:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
