import { writeFile } from 'fs/promises';
import { resolve, extname } from 'path';
import * as path from 'path';
import * as fs from 'fs';

const nr_aleatorio = (): number => Math.floor(Math.random() * 10000 + 10000);

export async function saveFilesToDisk(file: Express.Multer.File): Promise<string> {
  const uniqueName = `${Date.now()}_${nr_aleatorio()}${extname(file.originalname)}`;
  let folder = 'others';

  if (file.mimetype.startsWith('image/')) {
    folder = 'img';
  }

  const uploadRoot = resolve(process.cwd(), 'uploads');
  const finalFolder = resolve(uploadRoot, folder);

  // Garantir que a pasta 'uploads/folder' existe
  if (!fs.existsSync(finalFolder)) {
    fs.mkdirSync(finalFolder, { recursive: true });
  }

  const filePath = resolve(finalFolder, uniqueName);
  await writeFile(filePath, file.buffer);
  return uniqueName;
}

export interface FileToSave {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

export class FileSaver {
  private static readonly UPLOAD_ROOT = path.resolve(process.cwd(), 'uploads');
  private static readonly UPLOAD_DIR = path.resolve(FileSaver.UPLOAD_ROOT, 'img');

  static async saveFiles(files: FileToSave[]): Promise<string[]> {
    const savedFileNames: string[] = [];

    // Garantir que a pasta uploads e uploads/img existem
    for (const dir of [this.UPLOAD_ROOT, this.UPLOAD_DIR]) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    for (const file of files) {
      const fileName = this.generateFileName(file.originalname);
      const filePath = path.join(this.UPLOAD_DIR, fileName);

      try {
        await fs.promises.writeFile(filePath, file.buffer);
        savedFileNames.push(fileName);
      } catch (error) {
        await this.cleanupFiles(savedFileNames);
        throw new Error(`Erro ao salvar arquivo ${file.originalname}: ${error}`);
      }
    }

    return savedFileNames;
  }

  static async cleanupFiles(fileNames: string[]): Promise<void> {
    for (const fileName of fileNames) {
      const filePath = path.join(this.UPLOAD_DIR, fileName);
      try {
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      } catch (error) {
        console.error(`Erro ao limpar arquivo ${fileName}:`, error);
      }
    }
  }

  private static generateFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000 + 10000);
    const extension = path.extname(originalName);
    return `${timestamp}_${random}${extension}`;
  }
}
