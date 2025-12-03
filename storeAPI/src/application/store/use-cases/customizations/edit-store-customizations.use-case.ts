import { AppError } from "../../../../error/error";
import StoreCustomizations from "../../../../models/store-customizations.model";
import { S3Controller } from "../../../s3/controller/s3.cotroller";
import { StorecustomizationsDTO } from "../../dto/store.dto";
import { Request, Response } from "express";

export class EditStoreCustomizationsUseCase {
  static async execute(
    fk_storeId: string,
    {
      backgroundColorHeader,
      colorTextTitleHeader,
      titleHeaderText,
      imageBannerUrl,
      backgroundColorNavbar,
      colorTextNavbar,
      backgroundCatalog,
    }: StorecustomizationsDTO
  ): Promise<StoreCustomizations> {
    try {
      // Busca as customizações existentes
      const existingCustomizations = await StoreCustomizations.findOne({
        where: { fk_storeId },
      });

      // Se não existir, lança um erro
      if (!existingCustomizations) {
        throw new AppError("Customizações da loja não encontradas", 404);
      }

      // Verifica se há uma imagem antiga e a exclui do S3
      if (existingCustomizations.imageBannerKey) {
        // Cria um objeto `Request` simulado
        const reqDelete = {
          params: { url: existingCustomizations.imageBannerKey },
        } as unknown as Request; // Força a tipagem para `Request`

        // Cria um objeto `Response` simulado
        const resDelete = {
          status: (code: number) => ({
            json: (data: any) => {
              if (code !== 200) {
                throw new AppError("Falha ao excluir a imagem antiga", 500);
              }
            },
          }),
        } as unknown as Response; // Força a tipagem para `Response`

        await S3Controller.DeleteImage(reqDelete, resDelete);
      }

      // Atualiza as customizações
      existingCustomizations.backgroundColorHeader = backgroundColorHeader;
      existingCustomizations.colorTextTitleHeader = colorTextTitleHeader;
      existingCustomizations.titleHeaderText = titleHeaderText;
      // Se imageBannerUrl for fornecido, atualiza; caso contrário, mantém o existente
      if (imageBannerUrl !== undefined) {
        // Se a URL mudou, limpa a key antiga (nova imagem pode ter sido enviada via outro endpoint)
        if (imageBannerUrl && imageBannerUrl !== existingCustomizations.imageBannerUrl) {
          existingCustomizations.imageBannerKey = null;
        }
        existingCustomizations.imageBannerUrl = imageBannerUrl || null;
      }
      existingCustomizations.backgroundColorNavbar = backgroundColorNavbar;
      existingCustomizations.colorTextNavbar = colorTextNavbar;
      existingCustomizations.backgroundCatalog = backgroundCatalog;

      await existingCustomizations.save();

      return existingCustomizations;
    } catch (error) {
      console.error("Erro ao editar customizações da loja:", error);
      throw new AppError("Erro ao editar customizações da loja", 500);
    }
  }
}
