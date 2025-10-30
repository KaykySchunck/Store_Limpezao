import jwt from "jsonwebtoken";
import { AppError } from "../../../error/error";
import { VerifyTokenDTO } from "../dto/verify-auth.dto";

export class VerifyTokenUseCase {
  static async execute({ token }: VerifyTokenDTO) {
    try {
      const SECRET_KEY = process.env.JWT_SECRET_PASS;

      if (!SECRET_KEY) {
        throw new Error("SEM PALAVRA SECRETA JWT");
      }

      const decoded = jwt.verify(token, SECRET_KEY);

      return {
        valid: true,
        decoded,
      };
    } catch (error: any) {
      throw new AppError("Token inválido ou expirado", 401);
    }
  }
}
