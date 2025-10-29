import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  markOrderPaid,
  cancelOrder,
} from "../controllers/orderController.js";

const router = express.Router();
router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/user/:userId", getUserOrders);
router.put("/:id/status", updateOrderStatus);
router.put("/:id/pay", markOrderPaid);
router.put("/:id/cancel", cancelOrder);

export default router;
