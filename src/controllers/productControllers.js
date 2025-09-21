import { deleteFromCloudinary } from "../config/multer.js";
import { extractPublicIdFromUrl } from "../helper/helperfunction.js";
import Product from "../model/productModel.js";

export const getAllProducts = (req, res) => {
  // Logic to get all products
  res.send("List of products");
};

export const getProductById = (req, res) => {
  // Logic to get a product by ID
  res.send(`Product details for ID: ${req.params.id}`);
};

// admin
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, salingPrice, category, stock } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !salingPrice ||
      !category ||
      !stock
    ) {
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
      salingPrice,
      category,
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

export const updateProduct = (req, res) => {
  // Logic to update a product
  res.send(`Product with ID: ${req.params.id} updated`);
};

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
