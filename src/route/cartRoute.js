import express from "express";
import { addTocart, fetchCart } from "../controllers/cartControllers.js";
const router = express.Router();

router.post('/addTocart',addTocart)
router.get('/fetchCart',fetchCart)
export default router;
