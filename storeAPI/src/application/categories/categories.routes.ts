import { Router } from "express";
import { CategorieController } from "./controllers/categories.controller";

const router = Router();

router.post("/create", async (req, res) => {
  await CategorieController.createCategorie(req, res);
});

router.get("/get", async (req, res) => {
  await CategorieController.getCategories(req, res);
});

router.get("/get/:categoryId", async (req, res) => {
  await CategorieController.getCategoryById(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  await CategorieController.deleteCategorie(req, res);
});

router.put("/update/:id", async (req, res) => {
  await CategorieController.updateCategorie(req, res);
});

router.get("/getByName/:name", async (req, res) => {
  await CategorieController.getCategoryByName(req, res);
});

export default router;
