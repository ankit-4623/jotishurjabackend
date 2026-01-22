import express from "express";
import { createOrder, getAllOrders, updateOrderStatus } from "../controllers/orderContollers.js";
import { verifyUserAuth, roleBasedAccess } from "../middlewares/userAuth.js";
const router = express.Router();

// User routes
router.post('/addOrder', verifyUserAuth, createOrder);

// Admin routes
router.get('/admin/all', verifyUserAuth, roleBasedAccess("admin"), getAllOrders);
router.put('/admin/status/:id', verifyUserAuth, roleBasedAccess("admin"), updateOrderStatus);

export default router;