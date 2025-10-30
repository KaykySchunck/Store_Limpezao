import { Router } from "express";
import { ItemController } from "./controllers/itens.controller";

const router = Router();

router.post("/create", async (req, res) => {
  await ItemController.createItem(req, res);
});

router.get("/get", async (req, res) => {
  await ItemController.getItens(req, res);
});

router.get("/get-itens-and-images", async (req, res) => {
  await ItemController.getItensAndImages(req, res);
});

router.get("/get-item-with-images/:id", async (req, res) => {
  await ItemController.getItemWithImagesById(req, res);
});

router.get("/get-itens-and-images", async (req, res) => {
  await ItemController.getItensAndImages(req, res);
});

router.get("/getItemById/:id", async (req, res) => {
  await ItemController.getItemById(req, res);
});

router.get("/getItemByName/:name", async (req, res) => {
  await ItemController.getItemByName(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  await ItemController.deleteItem(req, res);
});

router.put("/update/:id", async (req, res) => {
  await ItemController.updateItem(req, res);
});

export default router;
