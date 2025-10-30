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

      let imageBannerKey: string | null = null;

      // Verifica se o imageBannerUrl é uma nova imagem (buffer ou arquivo)
      if (imageBannerUrl instanceof Buffer || imageBannerUrl?.mimetype) {
        // Simula o objeto `req` e `res` para usar o S3Controller.CreateImage
        const reqUpload = {
          file: {
            buffer:
              imageBannerUrl instanceof Buffer
                ? imageBannerUrl
                : imageBannerUrl.buffer,
            originalname: `banner-${fk_storeId}-${Date.now()}`, // Nome único para o arquivo
            mimetype: imageBannerUrl.mimetype || "image/jpeg", // Tipo MIME padrão
          },
        } as unknown as Request; // Força a tipagem para `Request`

        const resUpload = {
          status: (code: number) => ({
            json: (data: any) => {
              if (code === 201) {
                // Se o upload for bem-sucedido, atualiza o imageBannerUrl com a URL do S3
                imageBannerUrl = data.data.Location;
                imageBannerKey = data.data.Key; // Salva a key do arquivo no S3
              } else {
                throw new AppError("Falha ao fazer upload da imagem", 500);
              }
            },
          }),
        } as unknown as Response; // Força a tipagem para `Response`

        // Chama o S3Controller.CreateImage para fazer o upload da nova imagem
        await S3Controller.CreateImage(reqUpload, resUpload);
      }

      // Atualiza as customizações
      existingCustomizations.backgroundColorHeader = backgroundColorHeader;
      existingCustomizations.colorTextTitleHeader = colorTextTitleHeader;
      existingCustomizations.titleHeaderText = titleHeaderText;
      existingCustomizations.imageBannerUrl = imageBannerUrl; // URL da imagem no S3
      existingCustomizations.imageBannerKey = imageBannerKey; // Key do arquivo no S3
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
