import Customer from "../models/Customer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await Customer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const customer = await Customer.create({ name, email, password });
    const token = jwt.sign({ id: customer._id, role: "customer" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ success: true, user: customer, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, customer.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: customer._id, role: "customer" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      user: { id: customer._id, name: customer.name, email: customer.email, role: "customer" },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
