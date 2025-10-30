import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { CreateItemDTO } from "../dto/itens.dto";
import Item from "../../../models/itens.model";

export class CreateItemUseCase {
  static async execute(createItemDTO: CreateItemDTO) {
    const { name, description, stock, value, fk_idstore, fk_idcategory } =
      createItemDTO;

    console.log(name, description, stock, value, fk_idstore, fk_idcategory);

    const newItem = await Item.create({
      id: uuidv4(),
      name,
      description,
      stock,
      value,
      fk_idstore,
      fk_idcategory,
    });

    return newItem;
  }
}
