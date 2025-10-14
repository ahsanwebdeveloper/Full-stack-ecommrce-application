import express from "express";
import upload from "../middleware/upload.js";
import { createProduct, getAllProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/add", upload.single("image"), createProduct);
router.get("/", getAllProducts);

export default router;
