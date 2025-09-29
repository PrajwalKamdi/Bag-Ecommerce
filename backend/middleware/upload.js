import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/Cloudinary_Setup.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bag_ecommerce", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

export default upload;
