import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  //  Store snapshot of user info
  userInfo: {
    name: String,
    phone: String,
    address: String,
    city: String,
    province: String,
    area: String,
    deliveryType: String, // "Home" or "Office"
  },

  //  Product snapshot array
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      image: String,
      color: String,
      size: String,
      price: Number,
      quantity: { type: Number, default: 1 },
    },
  ],

  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  paymentMethod: { type: String, default: "Cash on Delivery" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
