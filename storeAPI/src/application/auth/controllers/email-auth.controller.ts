import { Request, Response } from "express";
import { EmailAuthDto } from "../dto/email-auth.dto";
import { LoginMerchantUseCase } from "../use-cases/email-auth.use-case";
import { AppError } from "../../../error/error";

export class EmailAuthController {
  static async loginMerchantEmail(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { email, password } = req.body as EmailAuthDto;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios" });
      }

      const { token, id } = await LoginMerchantUseCase.execute({
        email,
        password,
      });

      return res.status(200).json({
        message: "Login realizado com sucesso",
        token,
        id,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
