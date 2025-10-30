export interface CreateCheckoutSessionDTO {
  merchantId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CreateCustomerPortalSessionDTO {
  merchantId: string;
  returnUrl: string;
}

export interface WebhookEventDTO {
  type: string;
  data: {
    object: any;
  };
}

export interface SubscriptionDTO {
  id: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt?: Date;
  fk_merchantId: string;
}

export interface PlanDTO {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
} 