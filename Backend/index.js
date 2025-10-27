import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Routes
import adminRoutes from "./routes/adminRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";

// Models
import Admin from "./models/Admin.js";
import Customer from "./models/Customer.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/banners", bannerRoutes);

// 🔹 Create Default Admin
// Create Default Admin after DB connection
async function createDefaultAdmin() {
  try {
    const defaultAdmin = await Admin.findOne({ email: "admin@gmail.com" });
    if (!defaultAdmin) {
      // Create admin with plain password; the Admin model has a pre-save hook
      // that will hash the password once.
      await Admin.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: "Admin@123",
        role: "admin",
      });
      console.log(" Default admin created");
    } else {
      // If admin exists, ensure its password matches the known default.
      // This fixes cases where the password may have been double-hashed.
      const isMatch = await bcrypt.compare("Admin@123", defaultAdmin.password);
      if (!isMatch) {
        defaultAdmin.password = "Admin@123";
        await defaultAdmin.save();
        console.log(" Default admin password reset");
      } else {
        console.log("ℹ Default admin already exists");
      }
    }
  } catch (err) {
    console.error("Error creating default admin:", err.message);
  }
}


//  Customer Registration
app.post("/api/customer/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Customer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const customer = await Customer.create({ name, email, password: hashed });

    res.status(201).json({ message: "Customer registered successfully", customer });
  } catch (err) {
    res.status(500).json({ message: "Registration error", error: err.message });
  }
});

//  Common Login (Admin or Customer)
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1 Try Admin login first
    let user = await Admin.findOne({ email });
    let role = "admin";

    // 2 If not admin, try Customer
    if (!user) {
      user = await Customer.findOne({ email });
      role = "customer";
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      role,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

// 🔹 MongoDB Connect and Start Server
mongoose
  .connect(process.env.MONGO_URI, {
    // Recommended options
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Increase server selection timeout so Atlas errors are clearer before giving up
    serverSelectionTimeoutMS: 30000,
  })
  .then(async () => {
    console.log(" MongoDB Connected");
    await createDefaultAdmin();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch((err) => console.error(" MongoDB Error:", err));
