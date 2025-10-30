import { stripe } from "../../../config/stripe";
import { CreateCustomerPortalSessionDTO } from "../dto/stripe.dto";
import Merchant from "../../../models/merchant.model";
import { AppError } from "../../../error/error";

export class CreateCustomerPortalSessionUseCase {
  static async execute({
    merchantId,
    returnUrl,
  }: CreateCustomerPortalSessionDTO) {
    try {
      // Buscar o merchant
      const merchant = await Merchant.findByPk(merchantId);
      if (!merchant) {
        throw new AppError("Merchant não encontrado", 404);
      }

      if (!merchant.stripeCustomerId) {
        throw new AppError("Merchant não possui customer ID do Stripe", 400);
      }

      // Criar sessão do portal do cliente
      const session = await stripe.billingPortal.sessions.create({
        customer: merchant.stripeCustomerId,
        return_url: returnUrl,
      });

      return {
        url: session.url,
      };
    } catch (error) {
      console.error("Erro ao criar sessão do portal:", error);
      throw new AppError("Erro ao criar sessão do portal", 500);
    }
  }
} 