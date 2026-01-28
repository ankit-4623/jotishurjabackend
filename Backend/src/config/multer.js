import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowedFormats: ["jpg", "png", "jpeg", "webp"],
  },
});

export const upload = multer({ storage });

// Gallery storage for photos and videos
const galleryStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video");
    return {
      folder: "gallery",
      resource_type: isVideo ? "video" : "image",
      allowedFormats: isVideo 
        ? ["mp4", "webm", "mov", "avi"] 
        : ["jpg", "png", "jpeg", "webp", "gif"],
    };
  },
});

export const galleryUpload = multer({ storage: galleryStorage });

export const deleteFromCloudinary = async (public_id, resource_type = "image") => {
  try {
    return await cloudinary.uploader.destroy(public_id, { resource_type });
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
  }
};
