import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productControllers.js";
import { upload } from "../config/multer.js";
import { roleBasedAccess, verifyUserAuth } from "../middlewares/userAuth.js";
const router = express.Router();
router.get("/getproduct/:id",getProductById);
router.get("/getallProduct",getAllProducts);

//admin
router.post("/addProduct",verifyUserAuth,roleBasedAccess("admin"), upload.array("images", 5), addProduct);
router.delete("/deleteProduct/:id",verifyUserAuth,roleBasedAccess("admin"), deleteProduct);
router.put("/updatedProduct/:id",verifyUserAuth,roleBasedAccess("admin"),upload.array("images", 5), updateProduct);

export default router;
