import crypto from "crypto";
import { instance } from "../config/payment.js";

// Process Payment - Create Razorpay Order
export const processPayment = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100), // Amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };
        const order = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log("Payment error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create payment order",
        });
    }
};

// Send Razorpay API Key
export const sendAPIKey = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            key: process.env.RAZORPAY_API_KEY,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Payment Verification
export const paymentVerification = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            return res.status(200).json({
                success: true,
                message: "Payment verified successfully",
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

