import { Request, Response } from "express";

import { AppError } from "../../../error/error";
import { VerifyTokenDTO } from "../dto/verify-auth.dto";
import { VerifyTokenUseCase } from "../use-cases/verify-auth.use-case";

export class VerifyTokenController {
  static async verifyToken(req: Request, res: Response): Promise<Response> {
    try {
      const { token }: VerifyTokenDTO = req.body;

      if (!token) {
        return res.status(400).json({ message: "Token é obrigatório" });
      }

      const result = await VerifyTokenUseCase.execute({ token });

      return res.status(200).json({
        message: "Token verificado com sucesso",
        valid: result.valid,
        decoded: result.decoded,
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
