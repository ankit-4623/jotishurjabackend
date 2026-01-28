import express from "express";
import { uploadGalleryMedia, getAllGalleryMedia, deleteGalleryMedia } from "../controllers/galleryControllers.js";
import { verifyUserAuth } from "../middlewares/userAuth.js";
import { galleryUpload } from "../config/multer.js";

const router = express.Router();

// Public: Get all gallery media
router.get("/", getAllGalleryMedia);

// Authenticated users: Upload gallery media
router.post("/upload", verifyUserAuth, galleryUpload.array("media", 10), uploadGalleryMedia);

// Authenticated users: Delete gallery media
router.delete("/:id", verifyUserAuth, deleteGalleryMedia);

export default router;
