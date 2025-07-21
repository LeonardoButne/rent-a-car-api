import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import { promises as fs } from 'fs';

interface CompressedFile extends Express.Multer.File {
  originalSize?: number;
  compressedSize?: number;
  compressionRatio?: number;
}

// Função para comprimir imagem com validações
const compressImage = async (
  inputPath: string,
  outputPath: string,
  mimetype: string,
): Promise<{
  success: boolean;
  originalSize: number;
  compressedSize: number;
  error?: string;
}> => {
  let sharpInstance: sharp.Sharp | null = null;

  try {
    const fileExists = await fs
      .access(inputPath)
      .then(() => true)
      .catch(() => false);
    if (!fileExists) {
      throw new Error('Arquivo não encontrado: ' + inputPath);
    }

    const originalStats = await fs.stat(inputPath);
    const originalSize = originalStats.size;

    // Lê o arquivo como buffer para evitar problemas de acesso
    const inputBuffer = await fs.readFile(inputPath);

    // Configura o Sharp com o buffer
    sharpInstance = sharp(inputBuffer, {
      failOnError: false,
      limitInputPixels: false,
    });

    // Valida a imagem usando o buffer
    const metadata = await sharpInstance.metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error('Imagem corrompida ou inválida');
    }

    // Aplica redimensionamento se necessário
    if (metadata.width > 1920 || metadata.height > 1080) {
      sharpInstance = sharpInstance.resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Aplica compressão baseada no tipo
    switch (mimetype) {
      case 'image/jpeg':
      case 'image/jpg':
        sharpInstance = sharpInstance.jpeg({
          quality: 85,
          progressive: true,
          mozjpeg: true,
          trellisQuantisation: true,
          overshootDeringing: true,
          optimizeScans: true,
        });
        break;

      case 'image/png':
        sharpInstance = sharpInstance.png({
          quality: 85,
          compressionLevel: 8,
          progressive: true,
          palette: true,
        });
        break;

      case 'image/webp':
        sharpInstance = sharpInstance.webp({
          quality: 85,
          effort: 6,
          lossless: false,
        });
        break;

      default:
        // Converte outros formatos para JPEG
        sharpInstance = sharpInstance.jpeg({
          quality: 85,
          progressive: true,
        });
        break;
    }

    // Salva a imagem comprimida
    await sharpInstance.toFile(outputPath);

    // Limpa a instância do Sharp
    sharpInstance.destroy();
    sharpInstance = null;

    // Verifica o tamanho final
    const compressedStats = await fs.stat(outputPath);
    const compressedSize = compressedStats.size;

    return {
      success: true,
      originalSize,
      compressedSize,
    };
  } catch (error) {
    console.error('Erro na compressão:', error);

    // Limpa a instância do Sharp em caso de erro
    if (sharpInstance) {
      try {
        sharpInstance.destroy();
      } catch (destroyError) {
        console.error('Erro ao destruir instância Sharp:', destroyError);
      }
    }

    return {
      success: false,
      originalSize: 0,
      compressedSize: 0,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
};

export const imageCompressionMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.files && !req.file) {
      return next();
    }

    const files: CompressedFile[] = [];

    // Normaliza para array
    if (req.file) {
      files.push(req.file as CompressedFile);
    } else if (Array.isArray(req.files)) {
      files.push(...(req.files as CompressedFile[]));
    } else if (req.files && typeof req.files === 'object') {
      Object.values(req.files).forEach((fileArray) => {
        if (Array.isArray(fileArray)) {
          files.push(...(fileArray as CompressedFile[]));
        } else {
          files.push(fileArray as CompressedFile);
        }
      });
    }

    // Processa cada arquivo de imagem
    for (const file of files) {
      if (file.mimetype.startsWith('image/') && !['image/svg+xml', 'image/gif'].includes(file.mimetype)) {
        const originalPath = file.path;
        const tempPath = originalPath + '.temp';

        await new Promise((resolve) => setTimeout(resolve, 500));

        try {
          const result = await compressImage(originalPath, tempPath, file.mimetype);

          if (result.success && result.compressedSize < result.originalSize) {
            await new Promise((resolve) => setTimeout(resolve, 200));

            // Força garbage collection se disponível
            if (global.gc) {
              global.gc();
            }

            // Tenta deletar o arquivo original com retry
            let deleteAttempts = 0;
            const maxAttempts = 3;

            while (deleteAttempts < maxAttempts) {
              try {
                await fs.unlink(originalPath);
                break; // Sucesso, sai do loop
              } catch (unlinkError: any) {
                deleteAttempts++;
                if (deleteAttempts === maxAttempts) {
                  throw unlinkError;
                }
                // Espera antes de tentar novamente
                await new Promise((resolve) => setTimeout(resolve, 300));
              }
            }

            // Renomeia o arquivo comprimido
            await fs.rename(tempPath, originalPath);

            // Atualiza informações do arquivo
            file.originalSize = result.originalSize;
            file.compressedSize = result.compressedSize;
            file.compressionRatio = ((result.originalSize - result.compressedSize) / result.originalSize) * 100;
            file.size = result.compressedSize;
          } else {
            // Compressão não foi eficaz ou falhou, mantém original
            const tempExists = await fs
              .access(tempPath)
              .then(() => true)
              .catch(() => false);
            if (tempExists) {
              await fs.unlink(tempPath);
            }

            if (result.error) {
              console.log(`Erro na compressão de ${file.originalname}: ${result.error}`);
            } else {
              console.log(`Compressão não reduziu o tamanho de: ${file.originalname}`);
            }
          }
        } catch (error) {
          console.error(`Falha na compressão de ${file.originalname}:`, error);
          // Remove arquivo temporário se existir
          const tempExists = await fs
            .access(tempPath)
            .then(() => true)
            .catch(() => false);
          if (tempExists) {
            await fs.unlink(tempPath);
          }
        }
      }
    }

    next();
  } catch (error) {
    console.error('Erro no middleware de compressão:', error);
    next(); // Continua mesmo com erro
  }
};
