import { Request, Response } from "express";
import { AppError } from "../../../error/error";
import { CreateCheckoutSessionUseCase } from "../use-cases/create-checkout-session.use-case";
import { CreateCustomerPortalSessionUseCase } from "../use-cases/create-customer-portal-session.use-case";
import { ProcessWebhookUseCase } from "../use-cases/process-webhook.use-case";
import { STRIPE_PLANS } from "../../../config/stripe";
import { stripe } from "../../../config/stripe";
import Subscription from "../../../models/subscription.model";
import Merchant from "../../../models/merchant.model";
import { v4 as uuidv4 } from "uuid";

export class StripeController {
  static async createCheckoutSession(req: Request, res: Response): Promise<Response> {
    try {
      const { merchantId, priceId, successUrl, cancelUrl } = req.body;

      if (!merchantId || !priceId || !successUrl || !cancelUrl) {
        throw new AppError("Todos os campos são obrigatórios", 400);
      }

      const result = await CreateCheckoutSessionUseCase.execute({
        merchantId,
        priceId,
        successUrl,
        cancelUrl,
      });

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro ao criar sessão de checkout:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async createCustomerPortalSession(req: Request, res: Response): Promise<Response> {
    try {
      const { merchantId, returnUrl } = req.body;

      if (!merchantId || !returnUrl) {
        throw new AppError("Merchant ID e return URL são obrigatórios", 400);
      }

      const result = await CreateCustomerPortalSessionUseCase.execute({
        merchantId,
        returnUrl,
      });

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro ao criar sessão do portal:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async getPlans(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json({
        plans: Object.values(STRIPE_PLANS),
      });
    } catch (error) {
      console.error("Erro ao buscar planos:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async checkSubscription(req: Request, res: Response): Promise<Response> {
    try {
      const { merchantId } = req.body;

      if (!merchantId) {
        throw new AppError("Merchant ID é obrigatório", 400);
      }

      console.log("Verificando subscription para merchant:", merchantId);

      // Buscar subscription no banco
      const subscription = await Subscription.findOne({
        where: { 
          fk_merchantId: merchantId,
          status: 'active'
        },
      });

      const hasSubscription = !!subscription;

      console.log("Subscription encontrada:", hasSubscription);

      return res.status(200).json({
        hasSubscription,
        subscription: subscription ? subscription.toJSON() : null
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro ao verificar subscription:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async createSubscription(req: Request, res: Response): Promise<Response> {
    try {
      const { merchantId, email } = req.body;

      if (!merchantId || !email) {
        throw new AppError("Merchant ID e email são obrigatórios", 400);
      }

      console.log("Criando subscription para merchant:", merchantId);

      // Buscar o merchant
      const merchant = await Merchant.findByPk(merchantId);
      if (!merchant) {
        throw new AppError("Merchant não encontrado", 404);
      }

      // Buscar o customer no Stripe
      let customer;
      if (merchant.stripeCustomerId) {
        try {
          customer = await stripe.customers.retrieve(merchant.stripeCustomerId);
        } catch (error) {
          console.log("Customer não encontrado, criando novo...");
          customer = null;
        }
      }

      if (!customer) {
        // Buscar customer por email
        const customers = await stripe.customers.list({ email, limit: 1 });
        if (customers.data.length > 0) {
          customer = customers.data[0];
          // Atualizar merchant com customer ID
          await merchant.update({ stripeCustomerId: customer.id });
        }
      }

      if (!customer) {
        throw new AppError("Customer não encontrado no Stripe", 404);
      }

      // Buscar subscription ativa
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        limit: 1,
        status: 'active'
      });

      if (subscriptions.data.length === 0) {
        throw new AppError("Nenhuma subscription ativa encontrada", 404);
      }

      const subscription = subscriptions.data[0];

      // Criar subscription no banco
      const newSubscription = await Subscription.create({
        id: uuidv4(),
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer,
        stripePriceId: subscription.items.data[0].price.id,
        status: subscription.status,
        currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
        currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
        cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
        fk_merchantId: merchantId,
      });

      console.log("✅ Subscription criada no banco:", newSubscription.id);

      return res.status(200).json({
        message: "Subscription criada com sucesso",
        subscription: newSubscription
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro ao criar subscription:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async webhook(req: Request, res: Response): Promise<Response> {
    try {
      const signature = req.headers["stripe-signature"] as string;
      
      if (!signature) {
        throw new AppError("Assinatura do webhook não fornecida", 400);
      }

      await ProcessWebhookUseCase.execute(signature, req.body);

      return res.status(200).json({ received: true });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Erro no webhook:", error);
      return res.status(400).json({ message: "Erro no webhook" });
    }
  }
} 