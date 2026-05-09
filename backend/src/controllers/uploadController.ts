import { Request, Response } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import s3Client from '../config/r2';
import path from 'path';

// Configure Multer-S3
const upload = multer({
  storage: multerS3({
    s3: s3Client as any,
    bucket: process.env.R2_BUCKET_NAME || 'carbooking',
    acl: 'public-read', // R2 might ignore this but it's good practice for S3-compatible
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req: any, file, cb) {
      const folder = req.body?.folder || 'uploads';
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${folder}/${uniqueSuffix}${ext}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit 5MB
  },
});

export const uploadSingle = (req: Request, res: Response) => {
  const singleUpload = upload.single('file');

  singleUpload(req, res, (err) => {
    if (err) {
      console.error('Upload Error:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select a file to upload',
      });
    }

    // Generate Public URL
    const file = req.file as any;
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${file.key}`;

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: publicUrl,
        key: file.key,
        name: file.originalname,
        size: file.size,
      },
    });
  });
};
