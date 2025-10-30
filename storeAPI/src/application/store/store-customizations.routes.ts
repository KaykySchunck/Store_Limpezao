import { Router } from "express";
import { StoreCustomizationsController } from "./controllers/store-customizations.controller";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/getStoreCustomizationsByStoreId/:fk_storeId", async (req, res) => {
  await StoreCustomizationsController.getStoreCustomizationsByStoreId(req, res);
});

router.post("/createLayoutCustomizationsStore", async (req, res) => {
  await StoreCustomizationsController.createStoreCustomizationsLayout(req, res);
});

router.put(
  "/createOrUpdateStoreCustomizations",
  upload.single("imageBanner"), // Ajustado para "imageBanner" em vez de "file"
  async (req, res) => {
    await StoreCustomizationsController.createOrUpdateStoreCustomizationsLayout(
      req,
      res
    );
  }
);

export default router;
