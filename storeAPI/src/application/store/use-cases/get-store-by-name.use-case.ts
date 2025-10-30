import { Op } from "sequelize";
import Store from "../../../models/store.model";
import { AppError } from "../../../error/error";

export class GetStoreByNameUseCase {
  static async execute(merchantId: string, name: string) {
    const stores = await Store.findAll({
      where: {
        merchantId,
        name: {
          [Op.like]: `${name}%`,
        },
      },
    });

    if (stores.length === 0) {
      throw new AppError("Nenhuma loja encontrada", 404);
    }

    return stores;
  }
}
