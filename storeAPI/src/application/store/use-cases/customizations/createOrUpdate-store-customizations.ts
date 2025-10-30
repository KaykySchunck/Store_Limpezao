import { v4 as uuidv4 } from "uuid";
import StoreCustomizations from "../../../../models/store-customizations.model";
import { AppError } from "../../../../error/error";
import { S3Controller } from "../../../s3/controller/s3.cotroller";
import { Request, Response } from "express"; // Importa os tipos do Express

export class createOrUpdateStoreCustomizationsLayout {
  static async execute(
    fk_storeId: string,
    backgroundColorHeader: string,
    colorTextTitleHeader: string,
    titleHeaderText: string,
    imageBanner: Express.Multer.File | undefined,
    backgroundColorNavbar: string,
    colorTextNavbar: string,
    backgroundCatalog: string
  ): Promise<StoreCustomizations> {
    try {
      let imageBannerUrl: string | null = null;
      let imageBannerKey: string | null = null;

      // Busca customizações existentes no banco de dados
      let storeCustomizations = await StoreCustomizations.findOne({
        where: { fk_storeId },
      });

      // Se houver uma nova imagem e já existir customização, excluir a imagem antiga do S3
      if (
        imageBanner &&
        storeCustomizations &&
        storeCustomizations.imageBannerKey
      ) {
        // Cria um objeto compatível com o tipo Request do Express
        const reqDelete = {
          body: { key: storeCustomizations.imageBannerKey },
        } as Request;

        const resDelete = {
          status(code: number) {
            console.log(`Status code (delete): ${code}`);
            return this;
          },
          json(data: any) {
            console.log("Delete response data:", data);
            return data;
          },
        } as Response;

        // Chama o método de exclusão do S3Controller
        await S3Controller.DeleteImage(reqDelete, resDelete);
        console.log(
          `Imagem antiga com key ${storeCustomizations.imageBannerKey} excluída do S3.`
        );
      }

      // Se houver uma nova imagem, fazer upload para o S3
      if (imageBanner) {
        // Verificar se é um banner pré-disposto (SVG, JPEG, PNG)
        const isPredefinedBanner = imageBanner.originalname && (
          imageBanner.originalname.includes('.svg') ||
          imageBanner.originalname.includes('.jpeg') ||
          imageBanner.originalname.includes('.jpg') ||
          imageBanner.originalname.includes('.png')
        );
        
        if (isPredefinedBanner) {
          // É um banner pré-disposto, usar o caminho local
          imageBannerUrl = `/banners/${imageBanner.originalname}`;
          imageBannerKey = null; // Não há key para banners pré-dispostos
        } else {
          // É um arquivo real, fazer upload para o S3
          const reqUpload = {
            file: imageBanner,
          } as Request;
          let s3Response: any;
          const resUpload = {
            status(code: number) {
              console.log(`Status code (upload): ${code}`);
              return this;
            },
            json(data: any) {
              console.log("Upload response data:", data);
              s3Response = data;
              return data;
            },
          } as Response;

          // Chama o S3Controller para fazer o upload da nova imagem
          await S3Controller.CreateImage(reqUpload, resUpload);

          // Verifica se a resposta do S3 é válida
          if (
            !s3Response ||
            !s3Response.data ||
            !s3Response.data.Location ||
            !s3Response.data.Key
          ) {
            throw new AppError(
              "Resposta inválida do S3Controller ao fazer upload",
              500
            );
          }

          // Extrai a URL e a chave da nova imagem
          imageBannerUrl = s3Response.data.Location;
          imageBannerKey = s3Response.data.Key;
        }
      }

      if (!storeCustomizations) {
        // Cria novas customizações se não existir
        storeCustomizations = await StoreCustomizations.create({
          id: uuidv4(),
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
        console.log("Customizações criadas com sucesso!");
      } else {
        // Atualiza customizações existentes
        storeCustomizations.backgroundColorHeader = backgroundColorHeader;
        storeCustomizations.colorTextTitleHeader = colorTextTitleHeader;
        storeCustomizations.titleHeaderText = titleHeaderText;
        storeCustomizations.imageBannerUrl =
          imageBannerUrl || storeCustomizations.imageBannerUrl;
        storeCustomizations.imageBannerKey =
          imageBannerKey || storeCustomizations.imageBannerKey;
        storeCustomizations.backgroundColorNavbar = backgroundColorNavbar;
        storeCustomizations.colorTextNavbar = colorTextNavbar;
        storeCustomizations.backgroundCatalog = backgroundCatalog;

        await storeCustomizations.save();
        console.log("Customizações atualizadas com sucesso!");
      }

      return storeCustomizations;
    } catch (error) {
      console.error("Erro ao criar ou atualizar customizações da loja:", error);
      throw new AppError(
        "Falha ao criar ou atualizar customizações da loja",
        500
      );
    }
  }
}
