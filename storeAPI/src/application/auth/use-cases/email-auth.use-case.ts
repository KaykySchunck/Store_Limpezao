import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Merchant from "../../../models/merchant.model";
import { EmailAuthDto, EmailAuthResponseDto } from "../dto/email-auth.dto";
import { AppError } from "../../../error/error";

export class LoginMerchantUseCase {
  static async execute(
    loginMerchantDTO: EmailAuthDto
  ): Promise<EmailAuthResponseDto> {
    const { email, password } = loginMerchantDTO;

    const merchant = await Merchant.findOne({ 
      where: { email },
      attributes: ['id', 'email', 'password']
    });

    if (!merchant) {
      throw new AppError("E-mail não cadastrado", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, merchant.password);

    if (!isPasswordValid) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const jwtSecret = process.env.JWT_SECRET_PASS;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET_PASS não configurado no ambiente.");
    }

    const token = jwt.sign(
      { id: merchant.id, email: merchant.email },
      jwtSecret,
      { expiresIn: "3d" }
    );

    return { token, id: merchant.id };
  }
}
