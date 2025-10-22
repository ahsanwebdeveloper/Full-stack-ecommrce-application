import express from "express";
import upload from "../middleware/upload.js";
import { createBanner, getBanners, deleteBanner } from "../controllers/bannerController.js";

const router = express.Router();

router.post("/banner", upload.single("image"), createBanner);
router.get("/banner", getBanners);
router.delete("/banner/:id", deleteBanner);

export default router;