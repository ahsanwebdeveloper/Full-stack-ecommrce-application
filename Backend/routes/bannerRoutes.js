import express from "express";
import upload from "../middleware/upload.js";
import {
  createBanner,
  getBanners,
  deleteBanner,
} from "../controllers/bannerController.js";

const router = express.Router();

router.post("/", upload.single("image"), createBanner); // POST /api/banner
router.get("/banner", getBanners);                             // GET /api/banner?category=electronics
router.delete("/:id", deleteBanner);                     // DELETE /api/banner/:id

export default router;
