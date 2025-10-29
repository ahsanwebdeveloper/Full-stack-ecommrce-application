import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    userInfo: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      area: { type: String },
      deliveryType: { type: String, enum: ["Home", "Office"], default: "Home" },
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        image: { type: String },
        color: { type: String },
        size: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],

    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Credit Card", "Bank Transfer", "EasyPaisa", "JazzCash"],
      default: "Cash on Delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid", "Refunded"],
      default: "Unpaid",
    },
    paymentId: { type: String }, 
    paidAt: { type: Date },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
