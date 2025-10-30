import { Router } from "express";
import { S3Controller } from "../controller/s3.cotroller";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post("/create", upload.single("file"), async (req, res) => {
  await S3Controller.CreateImage(req, res);
});

router.get("/image/:url", async (req, res) => {
  await S3Controller.GetImage(req, res);
});

router.delete("/delete/:url", async (req, res) => {
  await S3Controller.DeleteImage(req, res);
});

export default router;
