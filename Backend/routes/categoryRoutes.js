import express from "express";
import upload from "../middleware/upload.js";
import { createCategory, getAllCategories } from "../controllers/categoryController.js";

const router = express.Router();

// POST → upload category (name + image)
router.post("/add", upload.single("image"), createCategory);

// GET → fetch all categories
router.get("/", getAllCategories);

export default router;
