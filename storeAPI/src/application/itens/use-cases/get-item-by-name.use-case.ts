import { Op } from "sequelize";
import Item from "../../../models/itens.model";

export class GetItemByNameUseCase {
  static async execute(fk_idstore: string, name: string) {
    const items = await Item.findAll({
      where: {
        fk_idstore: {
          [Op.eq]: fk_idstore,
        },
        name: {
          [Op.or]: [{ [Op.eq]: name }, { [Op.like]: `${name}%` }],
        },
      },
    });

    if (!items || items.length === 0) {
      throw new Error("Nenhum item encontrado.");
    }

    return items;
  }
}
