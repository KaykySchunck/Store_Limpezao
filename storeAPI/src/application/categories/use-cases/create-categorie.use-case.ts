import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { CreateCategorieDTO } from "../dto/categories.dto";
import Categorie from "../../../models/categorie.model";

export class CreateCategorieUseCase {
  static async execute(createCategorieDTO: CreateCategorieDTO) {
    const { name, fk_idstore } = createCategorieDTO;

    const existingCategory = await Categorie.findOne({
      where: {
        name: {
          [Op.eq]: name,
        },
        fk_idstore: {
          [Op.eq]: fk_idstore,
        },
      },
    });

    if (existingCategory) {
      throw new Error("Categoria já existe para este comerciante.");
    }

    const newCategory = await Categorie.create({
      id: uuidv4(),
      name,
      fk_idstore,
    });

    return newCategory;
  }
}
