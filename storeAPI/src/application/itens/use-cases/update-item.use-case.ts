import Item from "../../../models/itens.model";
import { ItemDTO } from "../dto/itens.dto";

export class UpdateItemUseCase {
  static async execute(id: string, updateItemDTO: ItemDTO) {
    const { name, description, stock, value, fk_idstore, fk_idcategory } =
      updateItemDTO;

    const item = await Item.findOne({
      where: {
        id: id,
      },
    });

    if (!item) {
      throw new Error("Item não encontrado");
    }

    if (name) item.name = name;
    if (description) item.description = description;
    if (stock !== undefined) item.stock = stock;
    if (value !== undefined) item.value = value;
    if (fk_idstore) item.fk_idstore = fk_idstore;
    if (fk_idcategory) item.fk_idcategory = fk_idcategory;

    await item.save();

    return item;
  }
}
