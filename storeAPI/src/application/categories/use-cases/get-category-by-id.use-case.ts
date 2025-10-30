import { Op } from "sequelize";
import Category from "../../../models/categorie.model";

export class GetCategoryByIdUseCase {
  static async execute(fk_idstore: string, categoryId: string) {
    const category = await Category.findOne({
      where: {
        fk_idstore: {
          [Op.eq]: fk_idstore,
        },
        id: {
          [Op.eq]: categoryId,
        },
      },
    });

    if (!category) {
      throw new Error("Categoria não encontrada.");
    }

    return category;
  }
}
