import { Request, Response } from "express";
import { S3Controller } from "../controller/s3.cotroller";

export class ItemController {
  static async uploadItemImage(req: Request, res: Response) {
    try {
      await S3Controller.CreateImage(req, res);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload item image", error });
    }
  }

  static async getItemImage(req: Request, res: Response) {
    try {
      await S3Controller.GetImage(req, res);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve item image", error });
    }
  }

  static async deleteItemImage(req: Request, res: Response) {
    try {
      await S3Controller.DeleteImage(req, res);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete item image", error });
    }
  }
}
