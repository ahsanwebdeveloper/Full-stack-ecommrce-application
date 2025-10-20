import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";


//  Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, price, oldprice, category, color, size, brandname } = req.body;
    const numericPrice = Number(price.toString().replace(/[^0-9.-]+/g, ""));
    const numericOldPrice = Number(oldprice.toString().replace(/[^0-9.-]+/g, ""));

    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      })
    );

    const product = new Product({
      name,
      price: numericPrice,
      oldprice: numericOldPrice,
      category,
      color,
      size,
      brandname,
      images: uploadedImages,
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//  Get All Products (with filter, search, pagination)
export const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };
    if (minPrice || maxPrice)
      query.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, oldprice, category, color, size, brandname, productquantity } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (req.files && req.files.length > 0) {
      await Promise.all(product.images.map((img) => cloudinary.uploader.destroy(img.public_id)));

      const uploadedImages = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return {
            url: result.secure_url,
            public_id: result.public_id,
          };
        })
      );
      product.images = uploadedImages;
    }

    product.name = name || product.name;
    product.price = price ? Number(price) : product.price;
    product.oldprice = oldprice ? Number(oldprice) : product.oldprice;
    product.category = category || product.category;
    product.brandname = brandname || product.brandname;
    product.color = color || product.color;
    product.size = size || product.size;
    product.productquantity = productquantity ? Number(productquantity) : product.productquantity;

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Get Products by Category
//  Get Products by Category
export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    console.log(category);
    
    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, "i") }, // case-insensitive
    });

    if (!products.length) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products by category",
      error: error.message,
    });
  }
};
//  Get Product By ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};


// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    await Promise.all(product.images.map((img) => cloudinary.uploader.destroy(img.public_id)));
    await Product.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
  //category wise product fetch
  //  Get all unique categories


};
