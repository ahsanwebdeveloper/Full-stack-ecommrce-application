import Order from "../models/Order.js";


export const createOrder = async (req, res) => {
  try {
    const { userId, userInfo, products, totalAmount, paymentMethod } = req.body;

    // Validation (basic)
    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const order = await Order.create({
      userId,
      userInfo,
      products,
      totalAmount,
      paymentMethod,
      status: "Pending",
      paymentStatus: "Unpaid",
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(" Order creation error:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};


export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate("userId", "name email");
    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(" Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("products.productId", "name price");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(" Error fetching order by ID:", error);
    res.status(500).json({ success: false, message: "Failed to fetch order" });
  }
};



export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Find all orders for this user and populate their info
    const orders = await Order.find({ userId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this user" });
    }

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user's orders",
      error: error.message, // helpful for debugging
    });
  }
};



export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status || order.status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(" Error updating order status:", error);
    res.status(500).json({ success: false, message: "Failed to update order status" });
  }
};


export const markOrderPaid = async (req, res) => {
  try {
    const { paymentId } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.paymentStatus = "Paid";
    order.paymentId = paymentId || "manual";
    order.paidAt = new Date();
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order marked as paid",
      order,
    });
  } catch (error) {
    console.error(" Error marking payment:", error);
    res.status(500).json({ success: false, message: "Failed to mark payment" });
  }
};


export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (["Shipped", "Delivered"].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel an order that is already shipped or delivered",
      });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error(" Error cancelling order:", error);
    res.status(500).json({ success: false, message: "Failed to cancel order" });
  }
};
