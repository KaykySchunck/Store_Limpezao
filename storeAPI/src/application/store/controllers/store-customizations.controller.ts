import { Request, Response } from "express";

import { AppError } from "../../../error/error";

import { CreateStoreCustomizationsUseCase } from "../use-cases/customizations/create-store-customizations.use-case";
import { StorecustomizationsDTO } from "../dto/store.dto";
import { GetStoreCustomizationsByStoreIdUseCase } from "../use-cases/customizations/get-store-customizations-by-id.use-case";
import { EditStoreCustomizationsUseCase } from "../use-cases/customizations/edit-store-customizations.use-case";
import { createOrUpdateStoreCustomizationsLayout } from "../use-cases/customizations/createOrUpdate-store-customizations";
import { error } from "console";

export class StoreCustomizationsController {
  static async createStoreCustomizationsLayout(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { fk_storeId } = req.body;

      const newStoreCustomizations =
        await CreateStoreCustomizationsUseCase.execute(fk_storeId as string);

      return res.status(201).json({
        message: "Customizações da loja criadas com sucesso",
        newStoreCustomizations,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro ao criar customizações da loja:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async editStoreCustomizations(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const {
        fk_storeId,
        backgroundColorHeader,
        colorTextTitleHeader,
        titleHeaderText,
        imageBannerKey,
        imageBannerUrl,
        backgroundColorNavbar,
        colorTextNavbar,
        backgroundCatalog,
      }: StorecustomizationsDTO = req.body;

      if (!fk_storeId) {
        throw new AppError("ID da loja não enviado", 404);
      }

      const existingStoreCustomizations =
        await GetStoreCustomizationsByStoreIdUseCase.execute(fk_storeId);

      if (!existingStoreCustomizations) {
        throw new AppError("Customizações da loja não encontradas", 404);
      }

      const updatedStoreCustomizations =
        await EditStoreCustomizationsUseCase.execute(fk_storeId, {
          fk_storeId,
          backgroundColorHeader,
          colorTextTitleHeader,
          titleHeaderText,
          imageBannerUrl,
          imageBannerKey,
          backgroundColorNavbar,
          colorTextNavbar,
          backgroundCatalog,
        });

      return res.status(200).json({
        message: "Customizações da loja atualizadas com sucesso",
        updatedStoreCustomizations,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro ao editar customizações da loja:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getStoreCustomizationsByStoreId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { fk_storeId } = req.params;

      if (!fk_storeId) {
        throw new AppError("ID da loja é obrigatório", 400);
      }

      const storeCustomizations =
        await GetStoreCustomizationsByStoreIdUseCase.execute(fk_storeId);

      if (!storeCustomizations) {
        throw new AppError("Customizações da loja não encontradas", 404);
      }

      const {
        backgroundColorHeader,
        colorTextTitleHeader,
        titleHeaderText,
        imageBannerUrl,
        backgroundColorNavbar,
        colorTextNavbar,
        backgroundCatalog,
      } = storeCustomizations;

      return res.status(200).json({
        message: "Customizações da loja encontradas com sucesso",
        storeCustomizations: {
          header: {
            backgroundColor: backgroundColorHeader,
            colorText: colorTextTitleHeader,
            titleText: titleHeaderText,
          },
          banner: {
            imageUrl: imageBannerUrl,
          },
          navbar: {
            backgroundColor: backgroundColorNavbar,
            colorText: colorTextNavbar,
          },
          catalog: {
            backgroundColor: backgroundCatalog,
          },
        },
      });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError ? error.message : "Erro interno do servidor";

      console.error("Erro ao buscar customizações da loja:", error);
      return res.status(statusCode).json({ message });
    }
  }

  static async createOrUpdateStoreCustomizationsLayout(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      // Extrai os campos de texto do req.body
      const {
        fk_storeId,
        backgroundColorHeader,
        colorTextTitleHeader,
        titleHeaderText,
        backgroundColorNavbar,
        colorTextNavbar,
        backgroundCatalog,
        imageBannerUrl, // Novo campo para banners pré-dispostos
      }: StorecustomizationsDTO = req.body;

      const imageBanner = req.file;

      console.log("=== DEBUG BACKEND ===");
      console.log("Corpo da requisição (req.body):", req.body);
      console.log("Arquivo recebido (req.file):", imageBanner);
      console.log("imageBannerUrl do body:", imageBannerUrl);
      console.log("======================");

      // Se não há arquivo mas há URL de banner pré-disposto, usar a URL
      let bannerToProcess = imageBanner;
      if (!imageBanner && imageBannerUrl && imageBannerUrl.includes('/banners/')) {
        console.log("Processando banner pré-disposto:", imageBannerUrl);
        
        // Determinar o tipo MIME baseado na extensão
        const fileName = imageBannerUrl.split('/').pop() || 'banner.svg';
        let mimeType = 'image/svg+xml'; // padrão
        if (fileName.toLowerCase().endsWith('.jpeg') || fileName.toLowerCase().endsWith('.jpg')) {
          mimeType = 'image/jpeg';
        } else if (fileName.toLowerCase().endsWith('.png')) {
          mimeType = 'image/png';
        }
        
        // Criar um objeto que simula um arquivo para banners pré-dispostos
        bannerToProcess = {
          buffer: Buffer.from('predefined-banner'),
          originalname: fileName,
          mimetype: mimeType,
          fieldname: 'imageBanner',
          encoding: '7bit',
          size: 0,
          destination: '',
          filename: '',
          path: ''
        } as Express.Multer.File;
      } else if (imageBanner) {
        console.log("Processando arquivo de upload:", imageBanner.originalname);
      }

      const storeCustomizations =
        await createOrUpdateStoreCustomizationsLayout.execute(
          fk_storeId as string,
          backgroundColorHeader,
          colorTextTitleHeader,
          titleHeaderText,
          bannerToProcess,
          backgroundColorNavbar,
          colorTextNavbar,
          backgroundCatalog
        );

      return res.status(200).json(storeCustomizations);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro ao editar ou criar customizações da loja:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
