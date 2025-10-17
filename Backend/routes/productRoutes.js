import express from "express";
import upload from "../middleware/upload.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} from "../controllers/productController.js";
import products from "../../Frontend/src/Data/productsdata.js";

const router = express.Router();

router.post("/add", upload.array("images", 4), createProduct);
router.get("/", getProducts);
router.put("/update/:id", upload.array("images", 4), updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  const Products = await products.find({ category });
  res.json({ success: true, count: Products.length, products });
});


export default router;
