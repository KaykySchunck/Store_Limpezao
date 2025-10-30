import Item from "../../../models/itens.model";
import { Op } from "sequelize";

export class GetItemByIdUseCase {
  static async execute(id: string) {
    const item = await Item.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });

    if (!item) {
      throw new Error("Item não encontrado.");
    }

    return item;
  }
}
