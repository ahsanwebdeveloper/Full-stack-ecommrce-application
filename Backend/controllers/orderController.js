import Order from "../models/Order.js";

// ✅ Create order
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

//  Fetch all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

//  Fetch single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ success: false, message: "Failed to fetch order" });
  }
};
