import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    position: {
      type: String,
      enum: ["top", "bottom", "sidebar"],
      default: "top",
    },
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
