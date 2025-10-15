import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  oldprice: { type: Number ,required: false},
  category: { type: String, required: true },
  color:{ type: String, required: false},
  size:{ type: String, required: false},
  brandname:{ type: String, required: false},
  productquantity: { type: Number, default: 0, required: true },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ], // cloudinary URL
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
