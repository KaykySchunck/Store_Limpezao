import { Op } from "sequelize";
import Item from "../../../models/itens.model";

export class GetItemsUseCase {
  static async execute(fk_idstore: string, fk_idcategory?: string) {
    const whereConditions: any = {
      fk_idstore: {
        [Op.eq]: fk_idstore,
      },
    };

    if (fk_idcategory) {
      whereConditions.fk_idcategory = {
        [Op.eq]: fk_idcategory,
      };
    }

    const itens = await Item.findAll({
      where: whereConditions,
    });

    if (itens.length === 0) {
      throw new Error(
        "Nenhum item encontrado para este comerciante e categoria."
      );
    }

    return itens;
  }
}
