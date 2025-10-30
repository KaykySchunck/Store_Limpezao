import { Router } from "express";
import { EmailAuthController } from "./controllers/email-auth.controller";
import { VerifyTokenController } from "./controllers/verify-auth.controller";

const router = Router();

router.post("/email", async (req, res) => {
  await EmailAuthController.loginMerchantEmail(req, res);
});

router.post("/verify-auth", async (req, res) => {
  await VerifyTokenController.verifyToken(req, res);
});

export default router;
