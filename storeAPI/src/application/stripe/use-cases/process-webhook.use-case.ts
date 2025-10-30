import { v4 as uuidv4 } from "uuid";
import { stripe, STRIPE_CONFIG } from "../../../config/stripe";
import Subscription from "../../../models/subscription.model";
import { AppError } from "../../../error/error";

export class ProcessWebhookUseCase {
  static async execute(signature: string, payload: Buffer) {
    try {
      console.log("=== WEBHOOK RECEBIDO ===");
      console.log("Signature:", signature);
      console.log("Payload length:", payload.length);
      console.log("Webhook secret configurado:", !!STRIPE_CONFIG.webhookSecret);
      console.log("Webhook secret:", STRIPE_CONFIG.webhookSecret ? STRIPE_CONFIG.webhookSecret.substring(0, 10) + "..." : "NÃO CONFIGURADO");

      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        STRIPE_CONFIG.webhookSecret
      );

      console.log("Evento construído:", event.type);
      console.log("Evento ID:", event.id);
      console.log("Evento data:", JSON.stringify(event.data, null, 2));

      switch (event.type) {
        case "checkout.session.completed":
          console.log("Processando checkout.session.completed");
          await this.handleCheckoutCompleted(event.data.object);
          break;
        case "customer.subscription.created":
          console.log("Processando customer.subscription.created");
          await this.handleSubscriptionCreated(event.data.object);
          break;
        case "customer.subscription.updated":
          console.log("Processando customer.subscription.updated");
          await this.handleSubscriptionUpdated(event.data.object);
          break;
        case "customer.subscription.deleted":
          console.log("Processando customer.subscription.deleted");
          await this.handleSubscriptionDeleted(event.data.object);
          break;
        case "invoice.payment_succeeded":
          console.log("Processando invoice.payment_succeeded");
          await this.handlePaymentSucceeded(event.data.object);
          break;
        case "invoice.payment_failed":
          console.log("Processando invoice.payment_failed");
          await this.handlePaymentFailed(event.data.object);
          break;
        case "customer.subscription.trial_will_end":
          console.log("Processando customer.subscription.trial_will_end");
          await this.handleTrialWillEnd(event.data.object);
          break;
        case "charge.succeeded":
          console.log("Processando charge.succeeded");
          await this.handleChargeSucceeded(event.data.object);
          break;
        case "customer.updated":
          console.log("Processando customer.updated");
          await this.handleCustomerUpdated(event.data.object);
          break;
        default:
          console.log(`Evento não tratado: ${event.type}`);
      }

      console.log("=== WEBHOOK PROCESSADO COM SUCESSO ===");
      return { received: true };
    } catch (error) {
      console.error("=== ERRO NO WEBHOOK ===");
      console.error("Erro:", error);
      console.error("Erro completo:", JSON.stringify(error, null, 2));
      throw new AppError("Erro ao processar webhook", 400);
    }
  }

  private static async handleChargeSucceeded(charge: any) {
    console.log("=== CHARGE SUCESSO ===");
    console.log("Charge ID:", charge.id);
    console.log("Customer ID:", charge.customer);
    console.log("Amount:", charge.amount);
    console.log("Description:", charge.description);
    
    // Se a charge tem description "Subscription creation", vamos buscar a subscription
    if (charge.description === "Subscription creation" && charge.customer) {
      try {
        const subscriptions = await stripe.subscriptions.list({
          customer: charge.customer,
          limit: 1,
          status: 'active'
        });
        
        if (subscriptions.data.length > 0) {
          const subscription = subscriptions.data[0];
          console.log("Subscription encontrada:", subscription.id);
          await this.handleSubscriptionCreated(subscription);
        } else {
          console.log("Nenhuma subscription ativa encontrada para o customer");
        }
      } catch (error) {
        console.error("Erro ao buscar subscription:", error);
      }
    }
  }

  private static async handleCustomerUpdated(customer: any) {
    console.log("=== CUSTOMER ATUALIZADO ===");
    console.log("Customer ID:", customer.id);
    console.log("Email:", customer.email);
    console.log("Metadata:", customer.metadata);
  }

  private static async handleSubscriptionCreated(subscription: any) {
    console.log("=== CRIANDO SUBSCRIPTION NO BANCO ===");
    console.log("Subscription ID:", subscription.id);
    console.log("Customer ID:", subscription.customer);
    console.log("Merchant ID:", subscription.metadata?.merchantId);
    console.log("Status:", subscription.status);
    console.log("Metadata completo:", JSON.stringify(subscription.metadata, null, 2));

    const merchantId = subscription.metadata?.merchantId;
    if (!merchantId) {
      console.log("ERRO: merchantId não encontrado no metadata");
      console.log("Metadata disponível:", subscription.metadata);
      return;
    }

    // Se o merchantId é temporário, não criar subscription ainda
    if (merchantId.startsWith('temp_')) {
      console.log("⚠️ Merchant ID é temporário, aguardando criação do merchant real");
      console.log("Subscription será criada após o merchant ser criado");
      return;
    }

    try {
      // Verificar se o merchant existe
      const Merchant = require("../../../models/merchant.model").default;
      const merchant = await Merchant.findByPk(merchantId);
      
      if (!merchant) {
        console.log("❌ Merchant não encontrado no banco:", merchantId);
        console.log("Aguardando criação do merchant...");
        return;
      }

      console.log("✅ Merchant encontrado:", merchant.email);

      // Verificar se a subscription já existe
      const existingSubscription = await Subscription.findOne({
        where: { stripeSubscriptionId: subscription.id }
      });

      if (existingSubscription) {
        console.log("⚠️ Subscription já existe no banco:", existingSubscription.id);
        console.log("Pulando criação de duplicata");
        return;
      }

      const newSubscription = await Subscription.create({
        id: uuidv4(),
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer,
        stripePriceId: subscription.items.data[0].price.id,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        fk_merchantId: merchantId,
      });

      console.log("✅ Subscription criada no banco:", newSubscription.id);
      console.log("Dados da subscription criada:", JSON.stringify(newSubscription.toJSON(), null, 2));
    } catch (error) {
      console.error("❌ Erro ao criar subscription no banco:", error);
      console.error("Erro completo:", JSON.stringify(error, null, 2));
    }
  }

  private static async handleSubscriptionUpdated(subscription: any) {
    console.log("=== ATUALIZANDO SUBSCRIPTION ===");
    console.log("Subscription ID:", subscription.id);

    const dbSubscription = await Subscription.findOne({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (dbSubscription) {
      await dbSubscription.update({
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        canceledAt: subscription.canceled_at 
          ? new Date(subscription.canceled_at * 1000) 
          : null,
      });
      console.log("Subscription atualizada no banco");
    } else {
      console.log("Subscription não encontrada no banco para atualizar");
    }
  }

  private static async handleSubscriptionDeleted(subscription: any) {
    console.log("=== DELETANDO SUBSCRIPTION ===");
    console.log("Subscription ID:", subscription.id);

    const dbSubscription = await Subscription.findOne({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (dbSubscription) {
      await dbSubscription.update({
        status: 'canceled',
        canceledAt: new Date(),
      });
      console.log("Subscription marcada como cancelada no banco");
    } else {
      console.log("Subscription não encontrada no banco para deletar");
    }
  }

  private static async handleCheckoutCompleted(session: any) {
    console.log("=== CHECKOUT COMPLETADO ===");
    console.log("Session ID:", session.id);
    console.log("Customer ID:", session.customer);
    console.log("Merchant ID:", session.metadata?.merchantId);
    console.log("Is Temporary:", session.metadata?.isTemporary);
    console.log("Metadata completo:", JSON.stringify(session.metadata, null, 2));
  }

  private static async handlePaymentSucceeded(invoice: any) {
    console.log("=== PAGAMENTO REALIZADO ===");
    console.log("Invoice ID:", invoice.id);
    console.log("Subscription ID:", invoice.subscription);
  }

  private static async handlePaymentFailed(invoice: any) {
    console.log("=== PAGAMENTO FALHOU ===");
    console.log("Invoice ID:", invoice.id);
    console.log("Subscription ID:", invoice.subscription);
  }

  private static async handleTrialWillEnd(subscription: any) {
    console.log("=== TRIAL VAI TERMINAR ===");
    console.log("Subscription ID:", subscription.id);
  }
} 