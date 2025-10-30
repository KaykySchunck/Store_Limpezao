import { Op } from "sequelize";
import Category from "../../../models/categorie.model";

export class GetCategoriesUseCase {
  static async execute(fk_idstore: string) {
    const categories = await Category.findAll({
      where: {
        fk_idstore: {
          [Op.eq]: fk_idstore,
        },
      },
    });

    if (categories.length === 0) {
      throw new Error("Nenhuma categoria encontrada nesse comerciante.");
    }

    return categories;
  }
}
