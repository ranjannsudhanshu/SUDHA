import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Readable } from 'stream';
import asyncHandler from 'express-async-handler';

// All image-storage specifics live in this one file. If you ever swap
// providers (S3, Supabase Storage, etc.) this is the only file that needs
// to change — controllers just read req.file.path / req.file.filename.
//
// Note: we upload to Cloudinary manually via upload_stream instead of using
// multer-storage-cloudinary, because that package only supports Cloudinary
// v1 and pins a conflicting peer dependency. Uploading via memory storage +
// upload_stream keeps us on Cloudinary v2 with one fewer dependency.

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const streamUpload = (buffer) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        transformation: [{ width: 1600, crop: 'limit', quality: 'auto' }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    Readable.from(buffer).pipe(uploadStream);
  });

// Middleware that, after multer reads the file into memory, uploads it to
// Cloudinary and normalizes the result onto req.file.path / req.file.filename
// so controllers can use them exactly as if multer-storage-cloudinary had
// handled it directly.
const attachCloudinaryResult = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const result = await streamUpload(req.file.buffer);
  req.file.path = result.secure_url;
  req.file.filename = result.public_id;
  next();
});

// Drop-in replacement for `upload.single(fieldName)` — use as
// `...uploadSingle('image')` (spread) in route definitions since it's two
// middlewares chained together.
export const uploadSingle = (fieldName) => [
  multerUpload.single(fieldName),
  attachCloudinaryResult,
];

export const deleteImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error('Cloudinary delete failed:', err.message);
  }
};

export default cloudinary;
