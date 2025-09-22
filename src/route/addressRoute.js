import express from "express";
import { Addaddress, deleteAddress, editAddress, fetchAddress } from "../controllers/addressControllers.js";
const router = express.Router();
router.post('/addAddress',Addaddress)
router.get('/getaddress/:id',fetchAddress)
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", editAddress);

export default router;
