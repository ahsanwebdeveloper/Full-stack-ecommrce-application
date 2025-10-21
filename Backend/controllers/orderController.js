import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, userInfo, products, totalAmount, paymentMethod } = req.body;

    const order = await Order.create({
      userId,
      userInfo,
      products,
      totalAmount,
      paymentMethod,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};
