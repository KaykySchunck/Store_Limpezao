import { Router } from "express";
import multer from "multer";
import { BannerController } from "../controller/banner.s3.controller";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post("/banner/upload", upload.single("file"), async (req, res) => {
  await BannerController.uploadBanner(req, res);
});

router.get("/banner/:url", async (req, res) => {
  await BannerController.getBanner(req, res);
});

router.delete("/banner/:url", async (req, res) => {
  await BannerController.deleteBanner(req, res);
});

export default router;
