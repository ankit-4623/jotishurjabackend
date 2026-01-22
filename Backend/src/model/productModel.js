import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    // salingPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: [{ type: String, required: true }],
    category: { type: String, default: "other" },
    name_hi: { type: String },
    planet: { type: String },
    planet_hi: { type: String },
    benefits: { type: String },
    benefits_hi: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
