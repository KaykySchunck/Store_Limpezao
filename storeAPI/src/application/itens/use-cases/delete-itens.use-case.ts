import { Op } from "sequelize";
import Item from "../../../models/itens.model";

export class DeleteItemUseCase {
  static async execute(id: string, fk_idcategory?: string) {
    const where: any = {
      id: {
        [Op.eq]: id,
      },
    };

    if (fk_idcategory) {
      where.fk_idcategory = {
        [Op.eq]: fk_idcategory,
      };
    }

    const item = await Item.findOne({
      where,
    });

    if (!item) {
      throw new Error(
        "Item não encontrado ou não pertence à categoria especificada."
      );
    }

    await item.destroy();

    return true;
  }
}
