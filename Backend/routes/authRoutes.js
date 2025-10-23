import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

export default router;
