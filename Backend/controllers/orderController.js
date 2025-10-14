import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;

    const order = await Order.create({
      userId,
      products,
      totalAmount,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};
