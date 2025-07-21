import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';

const nr_aleatorio = (): number => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {

    const allowedImageTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/gif',
      'image/bmp',
      'image/svg+xml',
      'image/tiff'
    ];
    const allowedPdfTypes = ['application/pdf'];

    if (![...allowedImageTypes, ...allowedPdfTypes].includes(file.mimetype)) {
      return cb(
        new multer.MulterError(
          'LIMIT_UNEXPECTED_FILE',
          'Apenas ficheiros PNG, JPG ou PDF são permitidos.'
        )
      );
    }
    cb(null, true);
  },
  storage: multer.memoryStorage(),
  limits: {
    files: 10
  }
};

// Novo middleware para processar imagens com Sharp
export const processImages = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  Promise.all(
    (req.files as Express.Multer.File[]).map(async (file) => {
      if (file.mimetype.startsWith('image/')) {
        const optimizedImage = await sharp(file.buffer)
          .resize({
            width: 1920,
            height: 1080,
            fit: sharp.fit.inside,
            withoutEnlargement: true
          })
          .jpeg({ quality: 80, mozjpeg: true })
          .png({ quality: 80, compressionLevel: 9 })
          .webp({ quality: 80 })
          .toBuffer();
        return {
          ...file,
          buffer: optimizedImage,
          size: optimizedImage.length
        };
      }
      return file;
    })
  )
    .then((processedFiles) => {
      req.files = processedFiles;
      next();
    })
    .catch((error) => {
      next(error);
    });
};