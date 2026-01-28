import Gallery from "../model/galleryModel.js";
import { deleteFromCloudinary } from "../config/multer.js";

// Upload gallery media (Admin only)
export const uploadGalleryMedia = async (req, res) => {
  try {
    const { type, title, category } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const mediaType = type || "photo";
    const mediaCategory = category || "other";
    const mediaTitle = title || "";

    const uploadedMedia = [];

    for (const file of req.files) {
      const newMedia = new Gallery({
        url: file.path,
        publicId: file.filename,
        type: mediaType,
        title: mediaTitle,
        category: mediaCategory,
      });

      await newMedia.save();
      uploadedMedia.push(newMedia);
    }

    res.status(201).json({
      success: true,
      message: `${uploadedMedia.length} media item(s) uploaded successfully`,
      data: uploadedMedia,
    });
  } catch (error) {
    console.error("Error uploading gallery media:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all gallery media (Public)
export const getAllGalleryMedia = async (req, res) => {
  try {
    const { type, category } = req.query;

    let filter = {};
    if (type && type !== "all") {
      filter.type = type;
    }
    if (category && category !== "all") {
      filter.category = category;
    }

    const media = await Gallery.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: media,
    });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete gallery media (Admin only)
export const deleteGalleryMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Gallery.findById(id);
    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }

    // Delete from Cloudinary
    if (media.publicId) {
      await deleteFromCloudinary(media.publicId);
    }

    // Delete from database
    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting gallery media:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
