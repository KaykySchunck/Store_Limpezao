import { Op } from "sequelize";
import Item from "../../../models/itens.model";
import Category from "../../../models/categorie.model";
import { AppError } from "../../../error/error";

export class DeleteCategorieUseCase {
  static async execute(id: string): Promise<void> {
    const category = await Category.findOne({
      where: { id },
    });

    if (!category) {
      throw new AppError("Categoria não encontrada.", 404);
    }

    await Item.destroy({
      where: {
        fk_idcategory: {
          [Op.eq]: id,
        },
      },
    });

    await category.destroy();
  }
}
