import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  oldprice: { type: Number ,required: false},
  category: { type: String, required: true },
  imageUrl: { type: String, required: true }, // cloudinary URL
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
