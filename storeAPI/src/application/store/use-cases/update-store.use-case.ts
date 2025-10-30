import { Op } from "sequelize";
import Store from "../../../models/store.model";
import { AppError } from "../../../error/error";

interface UpdateStoreDTO {
  id: string;
  name?: string;
  url?: string;
  whatsApp?: string;
  merchantId?: string;
}

export class UpdateStoreUseCase {
  static async execute(updateStoreDTO: UpdateStoreDTO) {
    const { id, name, url, whatsApp, merchantId } = updateStoreDTO;

    const existingStore = await Store.findOne({
      where: { id: { [Op.eq]: id } },
    });

    if (!existingStore) {
      throw new AppError("Loja não encontrada.", 404);
    }

    if (name && merchantId) {
      const duplicateNameStore = await Store.findOne({
        where: {
          name: { [Op.eq]: name },
          merchantId: { [Op.eq]: merchantId },
          id: { [Op.ne]: id },
        },
      });

      if (duplicateNameStore) {
        throw new AppError(
          "Já existe uma loja com este nome para o comerciante especificado.",
          400
        );
      }
    }

    if (url) {
      const duplicateUrlStore = await Store.findOne({
        where: {
          url: { [Op.eq]: url },
          id: { [Op.ne]: id },
        },
      });

      if (duplicateUrlStore) {
        throw new AppError("Já existe uma loja com esta URL.", 400);
      }
    }

    if (name) existingStore.name = name;
    if (url) existingStore.url = url;
    if (whatsApp) existingStore.whatsApp = whatsApp;
    if (merchantId) existingStore.merchantId = merchantId;

    await existingStore.save();

    return existingStore;
  }
}
