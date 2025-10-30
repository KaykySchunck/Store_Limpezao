import { Request, Response } from "express";
import { isEmailValid } from "../../utils/emailValidates";
import { CreateMerchantDTO } from "../dto/merchant.dto";
import { CrateMerchantUseCase } from "../use-cases/create-merchant.use-case";
import { AppError } from "../../../error/error";
import { GetMerchantByUrlUseCase } from "../use-cases/get-merchant-by-url.use-case";
import Merchant from "../../../models/merchant.model";

export class MerchantController {
  static async createMerchant(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password }: CreateMerchantDTO = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios" });
      }

      if (!isEmailValid(email)) {
        return res.status(400).json({ message: "E-mail inválido" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "A senha deve ter no mínimo 6 caracteres" });
      }

      const newMerchant = await CrateMerchantUseCase.execute({
        email,
        password,
      });

      return res.status(201).json({
        message: "Merchant criado com sucesso",
        merchant: {
          id: newMerchant.id,
          email: newMerchant.email,
        },
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      
      // Capturar erros simples também
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getMerchantByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "E-mail é obrigatório" });
      }

      const merchant = await Merchant.findOne({
        where: { email },
        attributes: ['id', 'email']
      });

      if (!merchant) {
        return res.status(404).json({ message: "Merchant não encontrado" });
      }

      return res.status(200).json({
        message: "Merchant encontrado com sucesso",
        merchant: {
          id: merchant.id,
          email: merchant.email,
        },
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      
      // Capturar erros simples também
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getMerchantByUrl(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { url } = req.params;

      if (!url) {
        return res.status(400).json({ message: "URL é obrigatória" });
      }

      const merchant = await GetMerchantByUrlUseCase.execute(url);

      return res.status(200).json({
        message: "Comerciante encontrado com sucesso",
        merchant,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      
      // Capturar erros simples também
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
