import Banner from "../models/Banner.js";
import cloudinary from "../config/cloudinary.js";

//  Create Banner
export const createBanner = async (req, res) => {
  try {
    const { link, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newBanner = new Banner({
      image: result.secure_url,
      link,
      category, //  category name like "electronics"
    });

    await newBanner.save();

    res.status(201).json({ success: true, data: newBanner });
  } catch (error) {
    console.error("Banner Creation Error:", error);
    res.status(500).json({ success: false, message: "Failed to create banner" });
  }
};

//  Get all banners or filter by category
export const getBanners = async (req, res) => {
  try {
    const { category } = req.query; // e.g. /api/banner?category=electronics
    const query = category ? { category } : {};
    const banners = await Banner.find(query);

    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    console.error("Get Banners Error:", error);
    res.status(500).json({ success: false, message: "Failed to get banners" });
  }
};

//  Delete Banner
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    await banner.deleteOne();
    res.status(200).json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Delete Banner Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete banner" });
  }
};
