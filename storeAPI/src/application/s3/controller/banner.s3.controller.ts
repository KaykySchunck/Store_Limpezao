import { Request, Response } from "express";
import { S3Controller } from "../controller/s3.cotroller";

export class BannerController {
  static async uploadBanner(req: Request, res: Response) {
    try {
      await S3Controller.CreateImage(req, res);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload banner", error });
    }
  }

  static async getBanner(req: Request, res: Response) {
    try {
      await S3Controller.GetImage(req, res);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve banner", error });
    }
  }

  static async deleteBanner(req: Request, res: Response) {
    try {
      await S3Controller.DeleteImage(req, res);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete banner", error });
    }
  }
}
