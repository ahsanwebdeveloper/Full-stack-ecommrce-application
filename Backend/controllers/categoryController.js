import Category from "../models/categoryModel.js";
import cloudinary from "../config/cloudinary.js";

//  Create new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    //  Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);

    //  Save to MongoDB
    const category = new Category({
      name,
      image: {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      },
    });

    await category.save();

    res.status(201).json({ success: true, category });
  } catch (error) {
    console.error(" Error creating category:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//  Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error(" Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
