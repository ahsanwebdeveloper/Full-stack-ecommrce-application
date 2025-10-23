import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();
const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: 1, name: 'Ahsan' }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log('Generated Token:', token);
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Verified user:', decoded);
} catch (err) {
  console.log('Invalid or expired token');
}
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/banners", bannerRoutes);
const createDefaultAdmin = async () => {
  const adminExists = await User.findOne({ email: "admin@gmail.com" });
  if (!adminExists) {
    const hashed = await bcrypt.hash("Admin@123", 10);
    await User.create({
      name: "Super Admin",
      email: "admin@gmail.com",
      password: hashed,
      isAdmin: true,
    });
    console.log(" Default admin created: admin@gmail.com / Admin@123");
  }
};

createDefaultAdmin();

// connect mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB Connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error(err));

