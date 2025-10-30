import { Router } from "express";
import { StoreController } from "./controllers/store.controller";

const router = Router();

router.post("/create", async (req, res) => {
  await StoreController.createStore(req, res);
});

router.get("/getByMerchant/:merchantId", async (req, res) => {
  await StoreController.getStoresByMerchant(req, res);
});

router.get("/getStoreByUrl/:url", async (req, res) => {
  await StoreController.getStoreByUrl(req, res);
});

router.get("/getStoreById/:id", async (req, res) => {
  await StoreController.getStoreById(req, res);
});

router.get("/getStoreByName/:merchantId", async (req, res) => {
  await StoreController.getStoreByName(req, res);
});

router.put("/update/:id", async (req, res) => {
  await StoreController.updateStore(req, res);
});

export default router;
