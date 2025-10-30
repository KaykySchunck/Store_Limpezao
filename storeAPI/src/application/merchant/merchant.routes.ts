import { Router } from "express";
import { MerchantController } from "./controllers/merchant.controller";

const router = Router();

router.post("/create", async (req, res) => {
  await MerchantController.createMerchant(req, res);
});

router.post("/by-email", async (req, res) => {
  await MerchantController.getMerchantByEmail(req, res);
});

router.get("/merchant/:url", async (req, res) => {
  await MerchantController.getMerchantByUrl(req, res);
});

export default router;
