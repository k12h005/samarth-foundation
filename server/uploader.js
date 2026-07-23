import fs from 'fs';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
const TRASH_DIR = path.join(UPLOADS_DIR, '_trash');

// Ensure upload and trash directories exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(TRASH_DIR)) {
  fs.mkdirSync(TRASH_DIR, { recursive: true });
}

// Multer memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only JPEG, PNG, and WebP images are allowed. (No HEIC or other types)'));
};

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB limit
  fileFilter
}).single('image');

export async function processAndSaveImage(fileBuffer, originalName, slug = 'image') {
  const timestamp = Date.now();
  const cleanedSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const fileName = `img-${timestamp}-${cleanedSlug}.webp`;
  const thumbName = `img-${timestamp}-${cleanedSlug}-thumb.webp`;
  
  const fullPath = path.join(UPLOADS_DIR, fileName);
  const thumbPath = path.join(UPLOADS_DIR, thumbName);

  // Process main image (Convert to WebP, compress to 80% quality, strip EXIF metadata)
  await sharp(fileBuffer)
    .rotate() // Auto-rotates using EXIF orientation tag
    .webp({ quality: 80 })
    .toFile(fullPath);

  // Process thumbnail (Resize to 300x300, WebP, quality 80, strip EXIF)
  await sharp(fileBuffer)
    .rotate()
    .resize(300, 300, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(thumbPath);

  return {
    url: `/uploads/${fileName}`,
    thumbnailUrl: `/uploads/${thumbName}`,
    filename: fileName,
    thumbnailFilename: thumbName
  };
}

// Move deleted images to recycle bin
export function recycleImage(filename) {
  const filePath = path.join(UPLOADS_DIR, filename);
  const trashPath = path.join(TRASH_DIR, filename);
  
  if (fs.existsSync(filePath)) {
    fs.renameSync(filePath, trashPath);
  }
  
  // Also recycle thumbnail if it exists
  const thumbName = filename.replace('.webp', '-thumb.webp');
  const thumbPath = path.join(UPLOADS_DIR, thumbName);
  const thumbTrashPath = path.join(TRASH_DIR, thumbName);
  if (fs.existsSync(thumbPath)) {
    fs.renameSync(thumbPath, thumbTrashPath);
  }
}
