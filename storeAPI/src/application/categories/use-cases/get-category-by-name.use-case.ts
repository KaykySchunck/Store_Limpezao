import { Op } from "sequelize";
import Category from "../../../models/categorie.model";

export class GetCategoryByNameUseCase {
  static async execute(fk_idstore: string, name: string) {
    const categories = await Category.findAll({
      where: {
        fk_idstore: {
          [Op.eq]: fk_idstore,
        },
        name: {
          [Op.or]: [{ [Op.eq]: name }, { [Op.like]: `${name}%` }],
        },
      },
    });

    if (!categories || categories.length === 0) {
      throw new Error("Nenhuma categoria encontrada.");
    }

    return categories;
  }
}
