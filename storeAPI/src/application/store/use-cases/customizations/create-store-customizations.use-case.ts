import { AppError } from "../../../../error/error";
import { v4 as uuidv4 } from "uuid";
import StoreCustomizations from "../../../../models/store-customizations.model";

export class CreateStoreCustomizationsUseCase {
  static async execute(fk_storeId: string) {
    try {
      const backgroundColorHeader = "#FFF";
      const colorTextTitleHeader = "#000";
      const titleHeaderText = "Titulo";
      const backgroundColorNavbar = "#FFF";
      const colorTextNavbar = "#0000";
      const backgroundCatalog = "#FFF";
      const imageBannerUrl = "";

      const existingCustomizations = await StoreCustomizations.findOne({
        where: { fk_storeId },
      });

      if (existingCustomizations) {
        throw new AppError(
          "Já existem customizações registradas para esta loja.",
          400
        );
      }

      const storeCustomizations = await StoreCustomizations.create({
        id: uuidv4(),
        backgroundColorHeader,
        colorTextTitleHeader,
        titleHeaderText,
        imageBannerUrl,
        backgroundColorNavbar,
        colorTextNavbar,
        backgroundCatalog,
        fk_storeId,
      });

      return storeCustomizations;
    } catch (error) {
      console.error("Erro ao criar customizações da loja:", error);
      throw new AppError("Erro ao criar customizações da loja", 500);
    }
  }
}
