import express from "express";
import upload from "../middleware/upload.js";
import { createBanner, getBanners, deleteBanner } from "../controllers/bannerController.js";

const router = express.Router();
router.post("/create", upload.single("image"), createBanner);
router.get("/", getBanners);
router.delete("/:id", deleteBanner);

export default router;
