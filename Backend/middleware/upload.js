import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "walmart_products",
    allowed_formats: ["jpg", "jpeg", "png"],
  }),
});

const upload = multer({ storage });

export default upload;
