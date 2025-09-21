function extractPublicIdFromUrl(imageUrl) {
  try {
    // Handle different Cloudinary URL formats
    // Example URLs:
    // https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/folder/image-name.jpg
    // https://res.cloudinary.com/your-cloud-name/image/upload/folder/image-name.jpg

    if (typeof imageUrl !== "string") {
      return null;
    }

    // Split the URL and find the part after 'upload/'
    const parts = imageUrl.split("/upload/");
    if (parts.length < 2) {
      return null;
    }

    // Get the path after 'upload/'
    let publicIdPart = parts[1];

    // Remove version if present (starts with 'v' followed by numbers)
    publicIdPart = publicIdPart.replace(/^v\d+\//, "");

    // Remove file extension
    const lastDotIndex = publicIdPart.lastIndexOf(".");
    if (lastDotIndex > 0) {
      publicIdPart = publicIdPart.substring(0, lastDotIndex);
    }

    return publicIdPart;
  } catch (error) {
    console.error("Error extracting public_id from URL:", error);
    return null;
  }
}

export { extractPublicIdFromUrl };
