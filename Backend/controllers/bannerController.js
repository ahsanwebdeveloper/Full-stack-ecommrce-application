import cloudinary from "../config/cloudinary.js";
import Banner from "../models/Banner.js";

//  Create new banner
export const createBanner = async (req, res) => {
  try {
    const { link, position } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new banner
    const newBanner = new Banner({
      image: result.secure_url,
      link,
      position: position || "top",
    });

    await newBanner.save();
    res.status(201).json({ success: true, data: newBanner });
  } catch (error) {
    console.error(" Banner Creation Error:", error);
    res.status(500).json({ success: false, message: "Failed to create banner" });
  }
};

//  Get all banners
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    console.error(" Get Banners Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch banners" });
  }
};

//  Delete banner
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    await banner.deleteOne();
    res.status(200).json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    console.error(" Delete Banner Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete banner" });
  }
};
