import { Op } from "sequelize";
import Item from "../../../models/itens.model";
import ImageItens from "../../../models/images_itens.model"; // Importe o modelo de imagens

export class GetItemsWithImagesUseCase {
  static async execute(fk_idstore: string, fk_idcategory?: string) {
    const whereConditions: any = {
      fk_idstore: {
        [Op.eq]: fk_idstore,
      },
    };

    if (fk_idcategory) {
      whereConditions.fk_idcategory = {
        [Op.eq]: fk_idcategory,
      };
    }

    // Busca os itens
    const itens = await Item.findAll({
      where: whereConditions,
    });

    if (itens.length === 0) {
      throw new Error(
        "Nenhum item encontrado para este comerciante e categoria."
      );
    }

    // Para cada item, busca as imagens correspondentes
    const itensWithImages = await Promise.all(
      itens.map(async (item) => {
        const images = await ImageItens.findAll({
          where: { fk_id_item: item.id }, // Busca as imagens pelo ID do item
        });

        return {
          ...item.toJSON(), // Converte o item para um objeto JSON
          images: images.map((image) => image.toJSON()), // Adiciona as imagens ao item
        };
      })
    );

    return itensWithImages;
  }
}
