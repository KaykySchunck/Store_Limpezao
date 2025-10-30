import { AppError } from "../../../error/error";
import Store from "../../../models/store.model";

export class GetStoreByUrlUseCase {
  static async execute(url: string) {
    const store = await Store.findOne({
      where: {
        url,
      },
    });

    if (!store) {
      throw new AppError("Loja não encontrada com o URL fornecido", 404);
    }

    return store;
  }
}
