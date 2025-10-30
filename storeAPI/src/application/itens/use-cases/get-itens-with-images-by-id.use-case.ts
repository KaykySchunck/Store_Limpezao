import ImageItens from "../../../models/images_itens.model";
import Item from "../../../models/itens.model";

export class GetItemWithImagesByIdUseCase {
  static async execute(itemId: string) {
    // Busca o item pelo ID
    const item = await Item.findByPk(itemId);

    if (!item) {
      throw new Error("Item não encontrado.");
    }

    // Busca as imagens do item
    const images = await ImageItens.findAll({
      where: { fk_id_item: itemId },
    });

    return {
      ...item.toJSON(),
      images: images.map((image: any) => image.toJSON()),
    };
  }
}
