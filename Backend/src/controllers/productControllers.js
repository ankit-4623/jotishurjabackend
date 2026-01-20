import { deleteFromCloudinary } from "../config/multer.js";
import { extractPublicIdFromUrl } from "../helper/helperfunction.js";
import Product from "../model/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// admin create product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!name || !description || !price || !stock) {
      if (req.files) {
        for (let file of req.files) {
          const public_id = extractPublicIdFromUrl(file.path);
          await deleteFromCloudinary(public_id);
        }
      }

      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    const imagePaths = req.files.map((file) => file.path);

    const newProduct = {
      name,
      description,
      price,
      stock,
      images: imagePaths,
    };

    const createdProduct = await Product.create(newProduct);
    return res
      .status(201)
      .json({ message: "Product added successfully", product: createdProduct });
  } catch (error) {
    if (req.files) {
      for (let file of req.files) {
        const public_id = extractPublicIdFromUrl(file.path);
        if (!public_id) {
          return res.status(400).json({ message: "Invalid image URL" });
        }
        await deleteFromCloudinary(public_id);
      }
    }
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// admin update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    console.log(name, description, price, stock);

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.files && req.files.length > 0) {
      for (let element of existingProduct.images) {
        const public_id = extractPublicIdFromUrl(element);
        await deleteFromCloudinary(public_id);
      }
      const imagePaths = req.files.map((file) => file.path);
      existingProduct.images = imagePaths;
    }

    existingProduct.name = name || existingProduct.name;
    existingProduct.description = description || existingProduct.description;
    existingProduct.price = price || existingProduct.price;
    existingProduct.stock = stock || existingProduct.stock;

    await existingProduct.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: existingProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
// admin delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  for (const image of product.images) {
    const publicId = extractPublicIdFromUrl(image);
    await deleteFromCloudinary(publicId);
  }

  await Product.findByIdAndDelete(id);
  return res.status(200).json({ message: "Product deleted successfully" });
};
