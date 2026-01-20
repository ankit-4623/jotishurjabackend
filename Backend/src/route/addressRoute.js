import express from "express";
import { Addaddress, deleteAddress, editAddress, fetchAddress } from "../controllers/addressControllers.js";
import { verifyUserAuth } from "../middlewares/userAuth.js";
const router = express.Router();
router.post('/addAddress',verifyUserAuth,Addaddress)
router.get('/getaddress/:id',verifyUserAuth,fetchAddress)
router.delete("/delete/:userId/:addressId",verifyUserAuth, deleteAddress);
router.put("/update/:userId/:addressId", verifyUserAuth,editAddress);

export default router;
