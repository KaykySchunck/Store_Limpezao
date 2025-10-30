import { AppError } from "../../../../error/error";
import StoreCustomizations from "../../../../models/store-customizations.model";

export class GetStoreCustomizationsByStoreIdUseCase {
  static async execute(
    fk_storeId: string
  ): Promise<StoreCustomizations | null> {
    try {
      const storeCustomizations = await StoreCustomizations.findOne({
        where: { fk_storeId },
      });

      console.log("Resultado da busca por customizações:", storeCustomizations);

      return storeCustomizations;
    } catch (error) {
      console.error("Erro ao buscar customizações da loja safadinha:", error);
      throw new AppError("Erro ao buscar customizações da loja cachorra", 500);
    }
  }
}
