import Cart from "../model/cartModel.js";
import Address from "../model/addressModel.js";
import Product from "../model/productModel.js";

//Create Order
export const createOrder = async (req, res) => {
  try {
    const { addressId } = req.body;
    const userId = req.user._id;

    if (!addressId) {
      return res.status(400).json({ message: "Address id is required" });
    }
    const address = await Address.findOne({
      _id: addressId,
      user: userId.toString(),
    }).populate("user", "name email");
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "No item in Cart " });
    }
    const cartItems = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      cartItems.push({
        productId: product._id,
        title: product.name,
        image: product.images,
        price: product.price,
        quantity: item.quantity,
      });
    }
    res.json({ cartItems, address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
