import { stripe } from "../../../config/stripe";
import { AppError } from "../../../error/error";
import Merchant from "../../../models/merchant.model";
import Subscription from "../../../models/subscription.model";
import { v4 as uuidv4 } from "uuid";

export class CreateCheckoutSessionUseCase {
  static async execute(data: {
    merchantId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
  }) {
    try {
      const { merchantId, priceId, successUrl, cancelUrl } = data;
      
      console.log("Iniciando criação de checkout session:", { merchantId, priceId });

      // Se o merchantId começa com 'temp_', é um checkout temporário
      const isTemporary = merchantId.startsWith('temp_');
      
      let merchant = null;
      let customer = null;

      if (!isTemporary) {
        // Buscar o merchant existente
        merchant = await Merchant.findByPk(merchantId);
        if (!merchant) {
          throw new AppError("Merchant não encontrado", 404);
        }
        console.log("Merchant encontrado:", merchant.email);
      } else {
        console.log("Checkout temporário - merchant será criado após pagamento");
      }

      // Se o priceId for 'premium', vamos criar o produto e preço
      let finalPriceId = priceId;
      
      if (priceId === 'premium') {
        console.log("Criando produto e preço para plano básico...");
        
        try {
          // Tentar buscar o produto existente
          const products = await stripe.products.list({ limit: 1, active: true });
          let product = products.data.find(p => p.name === "Plano Básico");
          
          if (!product) {
            console.log("Produto não encontrado, criando novo...");
            // Criar o produto se não existir
            product = await stripe.products.create({
              name: "Plano Básico",
              description: "Plano básico para lojas online",
              active: true,
            });
            console.log("Produto criado:", product.id);
          } else {
            console.log("Produto encontrado:", product.id);
          }

          // Tentar buscar o preço existente
          const prices = await stripe.prices.list({ 
            limit: 1, 
            active: true,
            product: product.id 
          });
          
          let price = prices.data.find(p => p.unit_amount === 9990); // R$ 99,90 em centavos
          
          if (!price) {
            console.log("Preço não encontrado, criando novo...");
            // Criar o preço se não existir
            price = await stripe.prices.create({
              product: product.id,
              unit_amount: 9990, // R$ 99,90 em centavos
              currency: 'brl',
              recurring: {
                interval: 'month',
              },
            });
            console.log("Preço criado:", price.id);
          } else {
            console.log("Preço encontrado:", price.id);
          }
          
          finalPriceId = price.id;
        } catch (error) {
          console.error("Erro ao criar produto/preço:", error);
          throw new AppError("Erro ao configurar produto", 500);
        }
      }

      console.log("Usando priceId:", finalPriceId);

      // Para checkout temporário, não precisamos de customer
      if (!isTemporary && merchant) {
        // Criar ou atualizar o customer no Stripe
        if (merchant.stripeCustomerId) {
          try {
            customer = await stripe.customers.retrieve(merchant.stripeCustomerId);
            console.log("Customer encontrado:", customer.id);
          } catch (error) {
            console.log("Customer não encontrado, criando novo...");
            customer = null;
          }
        }

        if (!customer) {
          console.log("Criando novo customer...");
          customer = await stripe.customers.create({
            email: merchant.email,
            metadata: {
              merchantId: merchant.id,
            },
          });
          console.log("Customer criado:", customer.id);

          // Atualizar o merchant com o customer ID
          await merchant.update({ stripeCustomerId: customer.id });
        }
      }

      // Criar a sessão de checkout
      console.log("Criando sessão de checkout...");
      const sessionData: any = {
        payment_method_types: ["card"],
        line_items: [
          {
            price: finalPriceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          merchantId: merchantId,
          isTemporary: isTemporary.toString(),
        },
        subscription_data: {
          metadata: {
            merchantId: merchantId,
            isTemporary: isTemporary.toString(),
          },
        },
      };

      // Adicionar customer apenas se não for temporário
      if (!isTemporary && customer) {
        sessionData.customer = customer.id;
      }

      const session = await stripe.checkout.sessions.create(sessionData);

      console.log("Sessão de checkout criada:", session.id);

      return {
        url: session.url,
        sessionId: session.id,
      };
    } catch (error) {
      console.error("Erro ao criar sessão de checkout:", error);
      throw new AppError("Erro ao criar sessão de checkout", 500);
    }
  }
} 