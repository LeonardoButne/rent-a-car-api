import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { extname } from 'path';

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
};
