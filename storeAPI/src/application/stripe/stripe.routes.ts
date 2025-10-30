import { Router } from "express";
import { StripeController } from "./controllers/stripe.controller";

const router = Router();

// Rotas de pagamento
router.post("/create-checkout-session", async (req, res) => {
  await StripeController.createCheckoutSession(req, res);
});

router.post("/create-portal-session", async (req, res) => {
  await StripeController.createCustomerPortalSession(req, res);
});

router.get("/plans", async (req, res) => {
  await StripeController.getPlans(req, res);
});

// Verificar subscription
router.post("/check-subscription", async (req, res) => {
  await StripeController.checkSubscription(req, res);
});

// Criar subscription manualmente
router.post("/create-subscription", async (req, res) => {
  await StripeController.createSubscription(req, res);
});

// Webhook (deve receber raw body)
router.post("/webhook", async (req, res) => {
  await StripeController.webhook(req, res);
});

export default router; 