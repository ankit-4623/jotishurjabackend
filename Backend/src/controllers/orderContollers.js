import Cart from "../model/cartModel.js";
import Address from "../model/addressModel.js";
import Product from "../model/productModel.js";
import Order from "../model/orderModel.js";

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

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("addressInfo.addressId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Admin: Get dashboard stats with monthly revenue
export const getAdminStats = async (req, res) => {
  try {
    const { year } = req.query;
    const targetYear = year ? parseInt(year) : new Date().getFullYear();

    // Get monthly revenue aggregation
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${targetYear}-01-01`),
            $lt: new Date(`${targetYear + 1}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalPrice" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Create array with 12 months, fill with 0 for months with no orders
    const revenueByMonth = Array(12).fill(0);
    monthlyRevenue.forEach(item => {
      revenueByMonth[item._id - 1] = item.revenue;
    });

    // Get total stats
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: "Processing" });
    const totalEarnings = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        monthlyRevenue: revenueByMonth,
        totalOrders,
        pendingOrders,
        totalEarnings: totalEarnings[0]?.total || 0,
        year: targetYear
      }
    });
  } catch (error) {
    console.log("Error getting admin stats:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
