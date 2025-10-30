import { Op } from "sequelize";
import Categorie from "../../../models/categorie.model";
import { AppError } from "../../../error/error";

interface UpdateCategorieDTO {
  id: string;
  name: string;
}

export class UpdateCategorieUseCase {
  static async execute(updateCategorieDTO: UpdateCategorieDTO) {
    const { id, name } = updateCategorieDTO;

    const existingCategory = await Categorie.findOne({
      where: { id: { [Op.eq]: id } },
    });

    if (!existingCategory) {
      throw new AppError("Categoria não encontrada.", 404);
    }

    const duplicateCategory = await Categorie.findOne({
      where: {
        name: { [Op.eq]: name },
        fk_idstore: { [Op.eq]: existingCategory.fk_idstore },
        id: { [Op.ne]: id },
      },
    });

    if (duplicateCategory) {
      throw new AppError(
        "Já existe uma categoria com este nome para esta loja.",
        400
      );
    }

    existingCategory.name = name;
    await existingCategory.save();

    return existingCategory;
  }
}
