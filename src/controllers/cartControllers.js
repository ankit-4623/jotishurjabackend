import Cart from "../model/cartModel.js";
import Product from "../model/productModel.js";
import jwt from "jsonwebtoken";
// create cart
export const addTocart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const userId = req.user._id;
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
     
      if (existproduct.stock >= qty) {
        cart.items.push({ product, quantity: qty });
      } else {
        return res.status(400).json({ message: "Quantity out of stock" });
      }
    } else {
      const newQuantity = cart.items[findproductIndex].quantity + qty;
      if (existproduct.stock >= newQuantity) {
        cart.items[findproductIndex].quantity = newQuantity;
      } else {
        return res.status(400).json({ message: "Quantity out of stock" });
      }
    }

    await cart.save();
    await cart.populate("items.product"); 

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
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "images name price salingPrice",
    });
    if (!cart)
      return res.status(200).json({ message: "cart not found", items: [] });
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

export const updateCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const userId = req.user._id;

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
      return res.status(404).json({
        success: false,
        message: "Cart item not present !",
      });
    } else {
      cart.items[findproductIndex].quantity = quantity;
    }

    const populateCartItems = cart.items.map((item) => ({
      productId: item.product ? item.product._id : null,
      image: item.product ? item.product.image : null,
      title: item.product ? item.product.title : "Product not found",
      price: item.product ? item.product.price : null,
      salePrice: item.product ? item.product.salePrice : null,
      quantity: item.quantity,
    }));

    await cart.save();

    res.status(200).json(populateCartItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//  Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.product.toString() !== id);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
