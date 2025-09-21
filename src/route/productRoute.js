import express from "express";
import {
  addProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import { upload } from "../config/multer.js";
const router = express.Router();
router.post("/addProduct", upload.array("images", 5), addProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
