import Product from "../models/Product.js";

// create new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageUrl = req.file.path; // multer gives this

    const product = await Product.create({
      name,
      description,
      price,
      category,
      imageUrl,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
