import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Store from "../../../models/store.model";
import { AppError } from "../../../error/error";
import { CreateStoreDTO } from "../dto/store.dto";

export class CreateStoreUseCase {
  static async execute(createStoreDTO: CreateStoreDTO) {
    const { name, merchantId, url, whatsApp } = createStoreDTO;

    // Check if any store already exists for this merchantId
    const existingStoreForMerchant = await Store.findOne({
      where: {
        merchantId: { [Op.eq]: merchantId },
      },
    });

    if (existingStoreForMerchant) {
      throw new AppError(
        "Já existe uma loja cadastrada para este usuário. Estamos trabalhando para disponibilizar o cadastro de múltiplas lojas por usuário em breve.",
        400
      );
    }

    // Check for existing store with same name (optional, keeping your original check)
    const existingStoreByName = await Store.findOne({
      where: {
        name: { [Op.eq]: name },
        merchantId: { [Op.eq]: merchantId },
      },
    });

    if (existingStoreByName) {
      throw new AppError(
        "Já existe uma loja com este nome para o comerciante especificado.",
        400
      );
    }

    // Check for existing store with same URL
    const existingStoreByUrl = await Store.findOne({
      where: {
        url: { [Op.eq]: url },
      },
    });

    if (existingStoreByUrl) {
      throw new AppError("Já existe uma loja com esta URL.", 400);
    }

    const newStore = await Store.create({
      id: uuidv4(),
      name,
      merchantId,
      url,
      whatsApp,
    });

    return newStore;
  }
}
