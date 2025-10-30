import Stripe from "stripe";

// Para usar cartões reais, mude para as chaves LIVE do Stripe
// 1. Vá para https://dashboard.stripe.com/apikeys
// 2. Copie a "Publishable key" e "Secret key" LIVE (não test)
// 3. Substitua as chaves abaixo

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export const STRIPE_CONFIG = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
};

export const STRIPE_PLANS = {
  BASIC: {
    id: 'premium', // Mantém 'premium' como identificador interno
    name: 'Plano Básico',
    price: 99.90,
    currency: 'brl',
    interval: 'month',
    features: [
      'Loja online completa',
      'Produtos ilimitados',
      'Suporte por e-mail',
      'Templates responsivos',
      'Relatórios básicos',
      'Integração com Stripe',
      'Personalização da loja'
    ]
  }
}; 