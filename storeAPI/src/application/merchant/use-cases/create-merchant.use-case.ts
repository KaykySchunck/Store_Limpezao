import { Op } from "sequelize";
import Merchant from "../../../models/merchant.model";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { CreateMerchantDTO } from "../dto/merchant.dto";
import { AppError } from "../../../error/error";

export class CrateMerchantUseCase {
  static async execute(createMerchantDTO: CreateMerchantDTO) {
    const { email, password } = createMerchantDTO;

    const existingMerchant = await Merchant.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
      attributes: ['id', 'email']
    });

    if (existingMerchant) {
      throw new AppError("E-mail já cadastrado", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMerchant = await Merchant.create({
      id: uuidv4(),
      email,
      password: hashedPassword,
    });

    return newMerchant;
  }
}
