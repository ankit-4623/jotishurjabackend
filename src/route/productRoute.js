import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productControllers.js";
import { upload } from "../config/multer.js";
const router = express.Router();
router.post("/addProduct", upload.array("images", 5), addProduct);
router.get("/getproduct/:id",getProductById);
router.get("/getallProduct",getAllProducts);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updatedProduct/:id",upload.array("images", 5), updateProduct);

export default router;
