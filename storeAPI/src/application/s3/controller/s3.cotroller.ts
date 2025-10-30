import { Request, Response } from "express";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export class S3Controller {
  static async CreateImage(req: any, res: any) {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `${uuidv4()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const result = await s3.upload(params).promise();
      res
        .status(201)
        .json({ message: "File uploaded successfully", data: result });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Failed to upload file", error: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Failed to upload file", error: "Unknown error" });
      }
    }
  }

  static async GetImage(req: Request, res: Response) {
    try {
      const { url } = req.params;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: url,
      };

      const data = await s3.getObject(params).promise();
      res.set("Content-Type", data.ContentType);
      res.send(data.Body);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Failed to retrieve file", error: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Failed to retrieve file", error: "Unknown error" });
      }
    }
  }

  static async DeleteImage(req: Request, res: Response) {
    try {
      const { url } = req.params;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: url,
      };

      await s3.deleteObject(params).promise();
      res.status(200).json({ message: "File deleted successfully" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Failed to delete file", error: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Failed to delete file", error: "Unknown error" });
      }
    }
  }
}
