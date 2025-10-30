import { Router } from "express";
import multer from "multer";
import { ImagesItensController } from "./controllers/images_itens.controller";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post("/create", upload.single("file"), async (req, res) => {
  await ImagesItensController.createImageItem(req, res);
});

router.get("/get-image-item-id", async (req, res) => {
  await ImagesItensController.getImages(req, res);
});

router.delete("/delete-image-item/:imageId", async (req, res) => {
  await ImagesItensController.deleteImage(req, res);
});

export default router;
