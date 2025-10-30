import { Router } from "express";
import multer from "multer";
import { ItemController } from "../controller/item.s3.controller";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post("/item/upload", upload.single("file"), async (req, res) => {
  await ItemController.uploadItemImage(req, res);
});

router.get("/item/:url", async (req, res) => {
  await ItemController.getItemImage(req, res);
});

router.delete("/item/:url", async (req, res) => {
  await ItemController.deleteItemImage(req, res);
});

export default router;
