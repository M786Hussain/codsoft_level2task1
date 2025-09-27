import multer from "multer";

// Memory storage (agar Cloud pe save karna hai, jaise Cloudinary)
const storage = multer.memoryStorage();

// ✅ yahan se named export karo
export const singleUpload = multer({ storage }).single("file");
