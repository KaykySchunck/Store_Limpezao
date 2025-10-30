import Merchant from "../../../models/merchant.model";
import { Op } from "sequelize";
import { AppError } from "../../../error/error";

export class GetMerchantByUrlUseCase {
  static async execute(url: string) {
    const merchant = await Merchant.findOne({
      where: {
        email: {
          [Op.eq]: url, // Assumindo que url é o email por enquanto
        },
      },
      attributes: ['id', 'email']
    });

    if (!merchant) {
      throw new AppError("Comerciante não encontrado.", 404);
    }

    return merchant;
  }
}
