import { AppError } from "../../../error/error";
import Store from "../../../models/store.model";

export class GetStoresByMerchantUseCase {
  static async execute(merchantId: string) {
    const stores = await Store.findAll({
      where: {
        merchantId,
      },
    });

    if (stores.length === 0) {
      throw new AppError("Nenhuma loja cadastrada para este merchantId", 404);
    }

    return stores;
  }
}
