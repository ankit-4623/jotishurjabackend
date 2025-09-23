import express from "express";
import { addTocart, clearCart, fetchCart, removeFromCart, updateCart } from "../controllers/cartControllers.js";
import { verifyUserAuth } from "../middlewares/userAuth.js";
const router = express.Router();

router.post('/addTocart',verifyUserAuth,addTocart)
router.post('/removeFromcart/:id',verifyUserAuth,removeFromCart)
router.post('/clearCart',verifyUserAuth,clearCart)
router.put('/updateCart',verifyUserAuth,updateCart)
router.get('/fetchCart',verifyUserAuth,fetchCart)
export default router;
