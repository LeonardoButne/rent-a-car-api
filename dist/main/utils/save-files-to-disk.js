"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSaver = void 0;
exports.saveFilesToDisk = saveFilesToDisk;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const nr_aleatorio = () => Math.floor(Math.random() * 10000 + 10000);
async function saveFilesToDisk(file) {
    const uniqueName = `${Date.now()}_${nr_aleatorio()}${(0, path_1.extname)(file.originalname)}`;
    let folder = 'others';
    if (file.mimetype.startsWith('image/')) {
        folder = 'img';
    }
    else if (file.mimetype === 'application/pdf') {
        folder = 'pdfs';
    }
    const filePath = (0, path_1.resolve)(__dirname, '../../infraestruture/uploads', folder, uniqueName);
    await (0, promises_1.writeFile)(filePath, file.buffer);
    return uniqueName;
}
class FileSaver {
    static UPLOAD_DIR = path.resolve(__dirname, '..', '..', 'infraestruture', 'uploads', 'img');
    static async saveFiles(files) {
        const savedFileNames = [];
        // Garantir que o diretório existe
        if (!fs.existsSync(this.UPLOAD_DIR)) {
            fs.mkdirSync(this.UPLOAD_DIR, { recursive: true });
        }
        for (const file of files) {
            const fileName = this.generateFileName(file.originalname);
            const filePath = path.join(this.UPLOAD_DIR, fileName);
            try {
                await fs.promises.writeFile(filePath, file.buffer);
                savedFileNames.push(fileName);
            }
            catch (error) {
                // Se houver erro ao salvar um arquivo, tentar limpar os arquivos já salvos
                await this.cleanupFiles(savedFileNames);
                throw new Error(`Erro ao salvar arquivo ${file.originalname}: ${error}`);
            }
        }
        return savedFileNames;
    }
    static async cleanupFiles(fileNames) {
        for (const fileName of fileNames) {
            const filePath = path.join(this.UPLOAD_DIR, fileName);
            try {
                if (fs.existsSync(filePath)) {
                    await fs.promises.unlink(filePath);
                }
            }
            catch (error) {
                console.error(`Erro ao limpar arquivo ${fileName}:`, error);
            }
        }
    }
    static generateFileName(originalName) {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000 + 10000);
        const extension = path.extname(originalName);
        return `${timestamp}_${random}${extension}`;
    }
}
exports.FileSaver = FileSaver;
//# sourceMappingURL=save-files-to-disk.js.map