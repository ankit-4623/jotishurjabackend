import express from "express";
import { createOrder } from "../controllers/orderContollers.js";
import {verifyUserAuth} from "../middlewares/userAuth.js";
const router = express.Router();
router.post('/addOrder',verifyUserAuth,createOrder)

export default router;