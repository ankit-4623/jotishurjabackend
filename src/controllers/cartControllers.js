import Cart from "../model/cartModel.js";
import Product from '../model/productModel.js'
import jwt from "jsonwebtoken";
// create cart
export const addTocart = async (req, res) => {
  try {
    const { product, quantity, userId } = req.body;
    const qty = Number(quantity);

    if (!product || !qty || qty <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    // Get product from DB
    const existproduct = await Product.findById(product);
    if (!existproduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const findproductIndex = cart.items.findIndex(
      (item) => item.product.toString() === product.toString()
    );

    if (findproductIndex === -1) {
      // New product in cart
      if (existproduct.stock >= qty) {
        cart.items.push({ product, quantity: qty });
      } else {
        return res.status(400).json({ message: "Quantity out of stock" });
      }
    } else {
      // Product already exists → check total requested quantity
      const newQuantity = cart.items[findproductIndex].quantity + qty;
      if (existproduct.stock >= newQuantity) {
        cart.items[findproductIndex].quantity = newQuantity;
      } else {
        return res.status(400).json({ message: "Quantity out of stock" });
      }
    }

    await cart.save();
    await cart.populate("items.product"); // Optional: return full product details

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// fetchcart by user
export const fetchCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(200).json({ message:"cart not found",items: [] });
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update cart

// delete cart
