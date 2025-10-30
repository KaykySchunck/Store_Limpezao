import { AppError } from "../../../error/error";
import Store from "../../../models/store.model";

export class GetStoreByIdUseCase {
  static async execute(id: string) {
    const store = await Store.findOne({
      where: {
        id,
      },
    });

    if (!store) {
      throw new AppError("Loja não encontrada com o ID fornecido", 404);
    }

    return store;
  }
}
