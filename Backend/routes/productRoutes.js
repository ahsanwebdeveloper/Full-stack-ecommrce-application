import express from "express";
import upload from "../middleware/upload.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", upload.array("images", 4), createProduct);
router.get("/", getProducts);
router.put("/update/:id", upload.array("images", 4), updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
