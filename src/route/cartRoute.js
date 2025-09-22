import express from "express";
import { addTocart, clearCart, fetchCart, removeFromCart, updateCart } from "../controllers/cartControllers.js";
const router = express.Router();

router.post('/addTocart',addTocart)
router.post('/removeFromcart/:id',removeFromCart)
router.post('/clearCart',clearCart)
router.put('/updateCart',updateCart)
router.get('/fetchCart',fetchCart)
export default router;
