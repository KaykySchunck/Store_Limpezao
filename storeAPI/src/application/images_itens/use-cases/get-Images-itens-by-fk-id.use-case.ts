import ImageItens from "../../../models/images_itens.model";

export class GetImageItemUseCaseByFkId {
  static async execute(fk_id_item: string) {
    try {
      const images = await ImageItens.findAll({
        where: { fk_id_item },
      });

      return images;
    } catch (error) {
      console.error("Error in getImagesByItemId:", error);
      throw new Error("Failed to retrieve images");
    }
  }
}
