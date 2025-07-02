"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const nr_aleatorio = () => Math.floor(Math.random() * 10000 + 10000);
exports.default = {
    fileFilter: (req, file, cb) => {
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
            return cb(new multer_1.default.MulterError('LIMIT_UNEXPECTED_FILE', 'Apenas ficheiros PNG, JPG ou PDF são permitidos.'));
        }
        cb(null, true);
    },
    storage: multer_1.default.memoryStorage(),
};
//# sourceMappingURL=multerConfig.js.map